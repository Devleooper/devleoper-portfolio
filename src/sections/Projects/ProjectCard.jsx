import TechIcon from '../../components/TechIcon'

export default function ProjectCard({ repo, t, inView, delay }) {
  const isThisSite = repo.name === 'devleoper-portfolio'
  return (
    <div
      className={`group bg-brand-light-bg dark:bg-brand-dark-surface border rounded-2xl p-7 flex flex-col gap-5 shadow-sm hover:shadow-md transition-all border-brand-light-muted/60 dark:border-brand-dark-muted ${
        isThisSite
          ? 'hover:border-brand-yellow hover:shadow-brand-yellow/20'
          : 'hover:border-brand-green/60'
      } ${inView ? 'fade-in-up' : 'opacity-0'}`}
      style={inView ? { animationDelay: `${delay}ms` } : undefined}
    >
      <div className="flex flex-col gap-2">
        <span
          className={`font-display leading-relaxed transition-colors ${
            isThisSite ? 'text-brand-green group-hover:text-brand-yellow' : 'text-brand-green'
          }`}
          style={{ fontSize: '8px' }}
        >
          {isThisSite ? (
            <>
              <span className="group-hover:hidden">REPO</span>
              <span className="hidden group-hover:inline">★ {t('projects.youAreHere')}</span>
            </>
          ) : (
            'REPO'
          )}
        </span>
        <h3 className="font-display text-brand-light-text dark:text-brand-dark-text leading-relaxed" style={{ fontSize: '11px' }}>
          {repo.name}
        </h3>
      </div>
      <p className="text-brand-light-text dark:text-brand-dark-text text-sm leading-relaxed flex-1">
        {t(`projects.repos.${repo.name}`, { defaultValue: repo.description || '' })}
      </p>
      {repo.techs.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {repo.techs.map((tech) => (
            <TechIcon
              key={tech.key}
              name={tech.name}
              icon={tech.icon}
              color={tech.color}
              size="sm"
            />
          ))}
        </div>
      )}
      <div className="flex gap-4 pt-1">
        {repo.homepage && !isThisSite && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-brand-green hover:underline"
          >
            {t('projects.liveDemo')}
          </a>
        )}
        <a
          href={repo.htmlUrl}
          target="_blank"
          rel="noreferrer"
          className={`text-sm font-medium text-brand-light-muted dark:text-brand-dark-muted transition-colors ${
            isThisSite
              ? 'hover:text-brand-yellow dark:hover:text-brand-yellow'
              : 'hover:text-brand-green dark:hover:text-brand-green'
          }`}
        >
          {t('projects.viewCode')}
        </a>
      </div>
    </div>
  )
}
