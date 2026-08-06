import { useTranslation } from 'react-i18next'
import { useHasSeen } from '../../context/animationContext'
import WalkingCat from './WalkingCat'

export default function AboutMe() {
  const { t } = useTranslation()
  const inView = useHasSeen('about')

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center pt-16"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 flex flex-col items-center text-center gap-8">
        <div className="shrink-0 flex flex-col items-center gap-6">
          <div className="relative w-52 h-52 sm:w-60 sm:h-60">
            <img
              src="/devleoper.png"
              alt="Developer pixel art"
              className={`w-full h-full object-contain ${inView ? 'fade-in-up' : 'opacity-0'}`}
              style={{ imageRendering: 'pixelated', ...(inView && { animationDelay: '400ms' }) }}
            />
            {inView && (
              <div
                className="cat-stage h-full"
                style={{ position: 'absolute', bottom: 0, width: '100vw', left: 'calc(50% - 50vw)' }}
                aria-hidden="true"
              >
                <WalkingCat name="leia" className="hidden dark:block" />
                <WalkingCat name="luffy" className="dark:hidden" />
                <img src="/animations/leia.png" alt="" className="cat-end cat-end--leia hidden dark:block" aria-hidden="true" />
                <img src="/animations/luffy.png" alt="" className="cat-end cat-end--luffy dark:hidden" aria-hidden="true" />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <p
            className={`text-brand-green font-semibold mb-3 text-sm ${inView ? 'fade-in-up' : 'opacity-0'}`}
            style={inView ? { animationDelay: '100ms' } : undefined}
          >
            {t('about.greeting')}
          </p>
          <h1
            className={`font-display text-xl sm:text-2xl font-bold mb-4 text-brand-light-text dark:text-brand-dark-text leading-relaxed ${inView ? 'fade-in-up' : 'opacity-0'}`}
            style={inView ? { animationDelay: '250ms' } : undefined}
          >
            {t('about.name')}
          </h1>
          <h2
            className={`font-display text-xs sm:text-sm text-brand-light-muted dark:text-brand-dark-muted mb-6 leading-relaxed ${inView ? 'fade-in-up' : 'opacity-0'}`}
            style={inView ? { animationDelay: '400ms' } : undefined}
          >
            {t('about.role')}
          </h2>
          <p
            className={`text-brand-light-text dark:text-brand-dark-text leading-relaxed max-w-xl ${inView ? 'fade-in-up' : 'opacity-0'}`}
            style={inView ? { animationDelay: '550ms' } : undefined}
          >
            {t('about.bio')}
          </p>
          <div
            className={`mt-8 flex flex-wrap justify-center gap-4 ${inView ? 'fade-in-up' : 'opacity-0'}`}
            style={inView ? { animationDelay: '700ms' } : undefined}
          >
            <a
              href="#contact"
              className="px-6 py-3 bg-brand-green hover:opacity-90 text-white font-medium rounded-lg transition-colors"
            >
              {t('about.cta.contact')}
            </a>
            <a
              href="#projects"
              className="px-6 py-3 border border-brand-light-muted dark:border-brand-dark-muted text-brand-light-text dark:text-brand-dark-text hover:bg-brand-light-surface dark:hover:bg-brand-dark-surface font-medium rounded-lg transition-colors"
            >
              {t('about.cta.projects')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
