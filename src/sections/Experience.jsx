import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useHasSeen } from '../context/AnimationContext'

const TIMELINE = [
  { key: 'sonatype',           tech: ['Java', 'Spring', 'React', 'AWS'] },
  { key: 'epam',               tech: ['Java', 'Spring', 'NestJS', 'Microservices', 'REST', 'AWS'] },
  { key: 'perficient',         tech: ['Java', 'Spring', 'Microservices', 'gRPC', 'JavaScript', 'GCP'] },
  { key: 'accentureAnalyst',   tech: ['Java', 'Spring', 'Microservices', 'Angular', 'React Native'] },
  { key: 'accentureAssociate', tech: ['Java', 'Microservices', 'REST', 'SOAP'] },
  { key: 'abogadosapp',        tech: ['Flutter', 'Firebase'] },
  { key: 'coco',               tech: ['Java', 'jQuery', 'Red Hat'] },
  { key: 'konrad',             tech: [] },
]

export default function Experience() {
  const { t } = useTranslation()
  const inView = useHasSeen('experience')
  const scrollRef = useRef(null)

  useEffect(() => {
    if (!inView && scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [inView])

  return (
    <section
      id="experience"
      className="min-h-screen flex items-center py-20 pt-24"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
        <h2
          className={`font-display text-lg sm:text-xl font-bold mb-3 text-brand-light-text dark:text-brand-dark-text leading-relaxed ${inView ? 'fade-in-up' : 'opacity-0'}`}
          style={inView ? { animationDelay: '100ms' } : undefined}
        >
          {t('experience.title')}
        </h2>
        <p
          className={`text-brand-light-muted dark:text-brand-dark-muted mb-8 ${inView ? 'fade-in-up' : 'opacity-0'}`}
          style={inView ? { animationDelay: '250ms' } : undefined}
        >
          {t('experience.subtitle')}
        </p>

        <div
          ref={scrollRef}
          className={`terminal-scroll max-h-[62vh] pr-2 flex flex-col gap-3 ${inView ? 'overflow-y-auto' : 'overflow-hidden'}`}
        >
          {TIMELINE.map((item, i) => {
            const date = t(`experience.items.${item.key}.date`, { present: t('experience.present') })
            return (
              <div
                key={item.key}
                className={`border-l-2 border-brand-green/30 hover:border-brand-green pl-5 py-4 rounded-r-lg transition-colors group cursor-default ${inView ? 'fade-in-up' : 'opacity-0'}`}
                style={inView ? { animationDelay: `${400 + i * 150}ms` } : undefined}
              >
                <span className="text-xs">
                  <span className="text-brand-green"># </span>
                  <span className="text-brand-light-text dark:text-brand-dark-text">{date}</span>
                </span>
                <h3 className="font-display text-xs font-semibold text-brand-light-text dark:text-brand-dark-text mt-1.5 leading-relaxed">
                  <span className="text-brand-green mr-2 group-hover:mr-3 transition-all">$</span>
                  {t(`experience.items.${item.key}.title`)}
                </h3>
                <p className="text-sm text-brand-light-muted dark:text-brand-dark-muted mt-1 ml-5">
                  @ {t(`experience.items.${item.key}.org`)}
                </p>
                <p className="text-sm text-brand-light-text dark:text-brand-dark-text leading-relaxed mt-2 ml-5 whitespace-pre-line">
                  {t(`experience.items.${item.key}.description`)}
                </p>
                {item.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3 ml-5">
                    {item.tech.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] rounded-md bg-brand-green/10 dark:bg-brand-green/20 text-brand-green border border-brand-green/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <p
          className={`text-xs text-brand-light-muted dark:text-brand-dark-muted mt-4 ${inView ? 'fade-in-up' : 'opacity-0'}`}
          style={inView ? { animationDelay: `${400 + TIMELINE.length * 150}ms` } : undefined}
        >
          {t('experience.scrollHint')}
        </p>
      </div>
    </section>
  )
}
