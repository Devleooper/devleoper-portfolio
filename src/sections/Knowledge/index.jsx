import { useTranslation } from 'react-i18next'
import { useHasSeen } from '../../context/animationContext'
import IdCard from './IdCard'

export default function Knowledge() {
  const { t } = useTranslation()
  const inView = useHasSeen('knowledge')

  return (
    <section
      id="knowledge"
      className="min-h-screen flex items-center py-24 bg-brand-light-surface/80 dark:bg-brand-dark-surface/50"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full">
        <h2 className="font-display text-lg sm:text-xl font-bold mb-3 text-brand-light-text dark:text-brand-dark-text leading-relaxed">
          {t('knowledge.title')}
        </h2>
        <p className="text-brand-light-muted dark:text-brand-dark-muted mb-16">
          {t('knowledge.subtitle')}
        </p>

        <IdCard inView={inView} />
      </div>
    </section>
  )
}
