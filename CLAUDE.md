# CLAUDE.md

Context for AI assistants working on this codebase.

## What this is

Personal portfolio site for Leonardo Ruiz (handle: `devleooper`, brand: `devleoper`).
Single-page, single-author, deployed as a static site. Public repo, owner expects
hand-written code that they can read and tweak themselves.

## Stack

- **React 19** + **Vite** + **Tailwind v4** (`@tailwindcss/vite`)
- **i18next** + `react-i18next` with browser language detection (EN / ES)
- **react-icons** (`/si`, `/fa`) for brand & tech icons
- **Formspree** free tier for the contact form (no backend)

No TypeScript, no test runner, no Storybook. Lint via `eslint` with `react-hooks`
and `react-refresh` plugins. Lint is enforced via `npm run lint`; the build does
not gate on lint.

## Project structure

```
src/
├── App.jsx, main.jsx              # Root
├── components/                    # Shared UI consumed by sections
│   ├── Navbar.jsx
│   └── TechIcon.jsx               # Portal-rendered tooltip icon (see notes below)
├── context/AnimationContext.jsx   # `useHasSeen(sectionId)` for one-shot fade-in
├── lib/techIcons.js              # Single source of truth for tech icons & language map
├── hooks/useGithubRepos.js        # GitHub API client for Projects
├── i18n/index.js, i18n/locales/   # i18next setup + en.json / es.json
└── sections/
    ├── AboutMe/{index, WalkingCat}.jsx
    ├── Knowledge/{index, IdCard}.jsx
    ├── Projects/{index, ProjectCard, SkeletonCard}.jsx
    ├── Experience.jsx
    └── Contact.jsx
public/
├── animations/                    # Cat sprite frames (leia + luffy)
├── og-banner.png                  # Pre-generated OG image (committed)
└── ...
scripts/generate-og.mjs            # Run manually to regenerate the OG image
```

Single-component sections (`Experience`, `Contact`) stay as flat `.jsx` files.
Multi-component sections live in their own folder with an `index.jsx` entry.

## Conventions

- **i18n first**: all user-facing strings go through `t('key')`. Both `en.json`
  and `es.json` must stay in sync. ES uses informal "tú", not "usted".
- **Tech icons**: `lib/techIcons.js` is the single registry. Add a new tech
  there with a slug key; `Knowledge` references it via `SKILL_CATEGORIES`,
  and `Projects` maps GitHub language strings via `getTechByLanguage()`.
- **Animations**: each section uses `useHasSeen('id')` from
  `context/AnimationContext` to gate `fade-in-up`. Stagger via inline
  `animationDelay`. The section ids are registered in
  `AnimationContext.SECTION_IDS`.
- **Brand colors**: defined as CSS variables in `index.css`
  (`--color-brand-light-*`, `--color-brand-dark-*`, `--color-brand-green`,
  `--color-brand-yellow`). Always reference via Tailwind classes
  (`text-brand-green`, etc.), never hard-coded hex.
- **Fonts**: `font-display` = pixel font (Press Start 2P), `font-body` = Space Mono.
  Pixel font for labels / headings, body font for prose.

## Key implementation notes

### `components/TechIcon.jsx` — portal-based tooltip

The Knowledge ID card's bento grid uses `fade-in-up`, whose animation ends with
`transform: translateY(0)`. That makes each cell a stacking context. A tooltip
inside one cell couldn't be raised above content in a sibling cell, no matter
the z-index.

Fix: render the tooltip via `createPortal(..., document.body)` so it escapes
the cells' stacking contexts entirely. Position is computed in viewport
coordinates from the icon's `getBoundingClientRect()` and clamped to keep the
tooltip on-screen on mobile. The arrow is offset by the same clamp delta so
it still points at the icon.

If you ever change the fade animation to not leave a residual transform, the
portal could be removed — but the viewport clamping is still nice for mobile.

### `hooks/useGithubRepos.js` — caching + rate limits

**Why topic-filter, not starred:** the first idea was to surface starred
repos. That was too noisy (zero stars on personal projects, third-party stars
unrelated to the portfolio) and gave no control over what shows up. We
switched to filtering by a `portfolio` GitHub topic the owner adds manually
to chosen repos — explicit, curated, no extra service.

- Endpoint: `https://api.github.com/users/devleooper/repos?per_page=100&sort=updated`
- Filter: `topics.includes('portfolio') && !fork && !archived`
- Sort: by `pushed_at` desc, take 4
- For each featured repo, fans out to `repo.languages_url` to get all languages
  (not just primary)
- Caches the serializable result in `sessionStorage` under key
  `gh:repos:devleooper`. **Icons are stripped before caching** (functions can't
  survive `JSON.stringify`); they're re-attached on read via
  `attachTechs(repos)`.
- Rate limit: unauthenticated GitHub is 60 req/hr per IP. With client-side
  fetch, each visitor uses their own quota, so this is effectively a non-issue.
  If the API returns 403 with `X-RateLimit-Remaining: 0` we surface a
  `rate_limit` error variant and show a fallback CTA to the public GitHub
  profile.

The site's own repo (`devleoper-portfolio`) gets a "★ YOU ARE HERE" badge —
detected by `repo.name === 'devleoper-portfolio'` in `ProjectCard`. The
project's description for Spanish is overlaid via
`t('projects.repos.<repoName>', { defaultValue: repo.description })`. Add a
new repo to ES by adding its key under `projects.repos` in `es.json`.

### `sections/Contact.jsx` — Formspree

- Endpoint hardcoded: `https://formspree.io/f/mdajkdpy` (safe to expose; this
  is how Formspree works)
- Payload uses Formspree's special fields to keep the email body clean:
  - `_subject` → `"Portfolio contact - {name}"`
  - `_replyto` → user's email (sets Reply-To)
  - `message` → only this appears in the email body
- Underscore-prefixed fields are special to Formspree and not rendered in the
  email body
- Client-side validation: required + simple email regex. `noValidate` on the
  form so the browser's native UI doesn't compete with our inline messages.
- States: `idle` → `submitting` → `success` | `error`. On `success`, the form
  is replaced by a "thanks" panel with a "Send another message" reset link.

### OG image

`scripts/generate-og.mjs` renders the social preview image to
`public/og-banner.png`. The `build` npm script runs the generator before
`vite build`, so the deployed image is always in sync with the script. Run
`npm run og` to regenerate just the image during development.

## When making changes

- **Don't add new top-level folders** without a strong reason. The current
  layout (`components/`, `sections/`, `lib/`, `hooks/`, `context/`, `i18n/`)
  covers everything for a site this size.
- **Don't introduce TypeScript** unless explicitly asked.
- **Don't add a state management library**. Component-local `useState` is
  plenty for this size.
- **Match the existing pixel/retro aesthetic**: small `font-display` labels in
  brand-green for section accents, brand-yellow reserved for the "YOU ARE
  HERE" badge.
- **i18n keys** must be added in pairs (EN + ES). Missing keys fall back to
  the key itself, which looks broken.
- **One commit per logical change**, conventional commits style. The Projects
  + Contact + restructure session was committed as a single
  `feat(projects, contact): ...` because the changes interlocked.
