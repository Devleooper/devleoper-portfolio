import { useTranslation } from 'react-i18next'
import { TECH, SKILL_CATEGORIES } from '../../lib/techIcons'
import TechIcon from '../../components/TechIcon'

export default function IdCard({ inView }) {
  const { t } = useTranslation()

  return (
    <div className={`${inView ? 'fade-in-up' : 'opacity-0'} rounded-2xl border border-brand-light-muted/60 dark:border-brand-dark-muted shadow-lg bg-brand-light-bg dark:bg-brand-dark-surface`}>

      {/* Card header strip */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-brand-green/10 dark:bg-brand-green/10 border-b border-brand-light-muted/60 dark:border-brand-dark-muted rounded-t-2xl">
        <span className="font-display text-brand-green leading-relaxed" style={{ fontSize: '8px' }}>
          DEVLEOPER
        </span>
        <span className="font-display text-brand-light-muted dark:text-brand-dark-muted leading-relaxed" style={{ fontSize: '8px' }}>
          1998
        </span>
      </div>

      <div className="flex flex-col sm:flex-row">

        {/* Left panel — photo + identity */}
        <div className="sm:w-52 flex flex-col items-center justify-between gap-4 p-6
          bg-brand-light-bg dark:bg-brand-dark-bg/60
          border-b sm:border-b-0 sm:border-r border-brand-light-muted/60 dark:border-brand-dark-muted">

          {/* Pixel art with glow + fade */}
          <div className="relative flex items-end justify-center w-full">
            <div className="absolute bottom-2 w-28 h-16 rounded-full bg-brand-green/20 blur-2xl glow-pulse" />
            <div
              className={inView ? 'fade-in-up' : 'opacity-0'}
              style={inView ? { animationDelay: '500ms' } : undefined}
            >
              <img
                src="/devleoper-pc.png"
                alt="Developer at computer"
                className="w-32 h-auto pixel-float drop-shadow-md"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          </div>

          {/* Identity text */}
          <div className="text-center w-full border-t border-brand-light-muted/60 dark:border-brand-dark-muted pt-4">
            <p className="font-display text-brand-green leading-relaxed mb-1" style={{ fontSize: '9px' }}>
              {t('knowledge.cardName')}
            </p>
            <p className="font-display text-brand-light-text dark:text-brand-dark-text leading-relaxed" style={{ fontSize: '7px' }}>
              {t('knowledge.cardAlias')}
            </p>
            <p className="text-brand-light-muted dark:text-brand-dark-muted mt-2" style={{ fontSize: '11px' }}>
              {t('knowledge.cardRole')}
            </p>
            <p
              className="text-brand-light-muted dark:text-brand-dark-muted mt-2 inline-flex items-center justify-center gap-1.5"
              style={{ fontSize: '10px' }}
            >
              {t('knowledge.cardLocation')}
              <img
                src="/colombia.webp"
                alt="Colombia"
                className="h-3 w-auto rounded-[1px] border border-brand-light-muted/40 dark:border-brand-dark-muted/60"
              />
            </p>
          </div>
        </div>

        {/* Right panel — skill bento cells */}
        <div className="flex-1 grid grid-cols-2 divide-x divide-y divide-brand-light-muted/40 dark:divide-brand-dark-muted">
          {SKILL_CATEGORIES.map(({ categoryKey, keys }, catIdx) => (
            <div
              key={categoryKey}
              className={`p-5 ${inView ? 'fade-in-up' : 'opacity-0'}`}
              style={inView ? { animationDelay: `${300 + catIdx * 120}ms` } : undefined}
            >
              <h3 className="font-display text-brand-green mb-3 leading-relaxed" style={{ fontSize: '8px' }}>
                {t(`knowledge.categories.${categoryKey}`)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {keys.map((skillKey) => {
                  const skill = TECH[skillKey]
                  return (
                    <TechIcon
                      key={skillKey}
                      name={skill.name}
                      icon={skill.icon}
                      color={skill.color}
                      fact={t(`knowledge.skills.${skillKey}`)}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
