import { useTranslation } from 'react-i18next'
import { useGithubRepos } from '../../hooks/useGithubRepos'
import { useHasSeen } from '../../context/AnimationContext'
import ProjectCard from './ProjectCard'
import SkeletonCard from './SkeletonCard'

const SKELETONS = [0, 1, 2, 3]

export default function Projects() {
  const { t } = useTranslation()
  const { repos, loading, error, username } = useGithubRepos()
  const inView = useHasSeen('projects')

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center py-20 pt-24 bg-brand-light-surface/80 dark:bg-brand-dark-surface/50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
        <h2 className={`font-display text-lg sm:text-xl font-bold mb-3 text-brand-light-text dark:text-brand-dark-text leading-relaxed ${inView ? 'fade-in-up' : 'opacity-0'}`}>
          {t('projects.title')}
        </h2>
        <p className={`text-brand-light-muted dark:text-brand-dark-muted mb-12 ${inView ? 'fade-in-up' : 'opacity-0'}`}>
          {t('projects.subtitle')}
        </p>

        {error ? (
          <div className="rounded-xl border border-brand-light-muted dark:border-brand-dark-muted p-6 text-center">
            <p className="text-brand-light-text dark:text-brand-dark-text mb-3">
              {t(error === 'rate_limit' ? 'projects.errorRateLimit' : 'projects.errorGeneric')}
            </p>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-brand-green hover:underline"
            >
              {t('projects.viewAllOnGithub')}
            </a>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {SKELETONS.map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : repos && repos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {repos.map((repo, idx) => (
              <ProjectCard
                key={repo.id}
                repo={repo}
                t={t}
                inView={inView}
                delay={200 + idx * 120}
              />
            ))}
          </div>
        ) : (
          <p className="text-brand-light-muted dark:text-brand-dark-muted text-center">
            {t('projects.empty')}
          </p>
        )}
      </div>
    </section>
  )
}
