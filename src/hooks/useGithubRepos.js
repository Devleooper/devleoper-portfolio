import { useEffect, useState } from 'react'
import { getTechByLanguage } from '../lib/techIcons'

const USERNAME = 'devleooper'
const CACHE_KEY = `gh:repos:${USERNAME}`
const PORTFOLIO_TOPIC = 'portfolio'
const FEATURED_LIMIT = 4

function isRateLimited(res) {
  return res.status === 403 && res.headers.get('X-RateLimit-Remaining') === '0'
}

async function fetchFeatured() {
  const reposRes = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`
  )
  if (!reposRes.ok) {
    const err = new Error(`GitHub ${reposRes.status}`)
    err.type = isRateLimited(reposRes) ? 'rate_limit' : 'generic'
    throw err
  }
  const repos = await reposRes.json()

  const featured = repos
    .filter(
      (r) => !r.fork && !r.archived && r.topics?.includes(PORTFOLIO_TOPIC)
    )
    .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
    .slice(0, FEATURED_LIMIT)

  const withLangs = await Promise.all(
    featured.map(async (repo) => {
      const langRes = await fetch(repo.languages_url)
      const languages = langRes.ok ? await langRes.json() : {}
      return {
        id: repo.id,
        name: repo.name,
        description: repo.description,
        htmlUrl: repo.html_url,
        homepage: repo.homepage,
        languages: Object.keys(languages).sort(
          (a, b) => languages[b] - languages[a]
        ),
      }
    })
  )

  return withLangs
}

// Adds non-serializable icon entries onto each repo. Done outside the cache
// because React components/functions can't survive JSON.stringify.
function attachTechs(repos) {
  return repos.map((r) => ({
    ...r,
    techs: r.languages.map(getTechByLanguage).filter(Boolean),
  }))
}

function readCache() {
  const cached = sessionStorage.getItem(CACHE_KEY)
  if (!cached) return null
  try {
    return JSON.parse(cached)
  } catch {
    sessionStorage.removeItem(CACHE_KEY)
    return null
  }
}

export function useGithubRepos() {
  const initial = readCache()
  const [repos, setRepos] = useState(initial)
  const [loading, setLoading] = useState(!initial)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (initial) return

    let cancelled = false
    fetchFeatured()
      .then((data) => {
        if (cancelled) return
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(data))
        setRepos(data)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.type === 'rate_limit' ? 'rate_limit' : 'generic')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    repos: repos ? attachTechs(repos) : null,
    loading,
    error,
    username: USERNAME,
  }
}
