import { useTranslation } from 'react-i18next'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com', icon: '🐙' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: '💼' },
  { label: 'Email', href: 'mailto:leonardo.ruizsua@gmail.com', icon: '✉️' },
]

export default function Contact() {
  const { t } = useTranslation()

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center py-20 pt-24"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full text-center">
        <h2 className="font-display text-lg sm:text-xl font-bold mb-3 text-brand-light-text dark:text-brand-dark-text leading-relaxed">
          {t('contact.title')}
        </h2>
        <p className="text-brand-light-muted dark:text-brand-dark-muted mb-12">
          {t('contact.subtitle')}
        </p>

        {/* Quick links */}
        <div className="flex justify-center gap-6 mb-12">
          {LINKS.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="flex flex-col items-center gap-2 group"
            >
              <span className="text-3xl">{icon}</span>
              <span className="text-sm font-medium text-brand-light-text dark:text-brand-dark-muted group-hover:text-brand-green transition-colors">
                {label}
              </span>
            </a>
          ))}
        </div>

        {/* Contact form */}
        <form
          className="bg-brand-light-surface/80 dark:bg-brand-dark-surface/50 border border-brand-light-muted dark:border-brand-dark-muted rounded-xl p-8 text-left flex flex-col gap-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label className="block text-sm font-medium text-brand-light-text dark:text-brand-dark-text mb-1.5">
              {t('contact.name')}
            </label>
            <input
              type="text"
              placeholder={t('contact.namePlaceholder')}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-light-muted dark:border-brand-dark-muted bg-brand-light-bg dark:bg-brand-dark-surface text-brand-light-text dark:text-brand-dark-text placeholder-brand-light-muted focus:outline-none focus:ring-2 focus:ring-brand-green transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-light-text dark:text-brand-dark-text mb-1.5">
              {t('contact.email')}
            </label>
            <input
              type="email"
              placeholder={t('contact.emailPlaceholder')}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-light-muted dark:border-brand-dark-muted bg-brand-light-bg dark:bg-brand-dark-surface text-brand-light-text dark:text-brand-dark-text placeholder-brand-light-muted focus:outline-none focus:ring-2 focus:ring-brand-green transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-light-text dark:text-brand-dark-text mb-1.5">
              {t('contact.message')}
            </label>
            <textarea
              rows={5}
              placeholder={t('contact.messagePlaceholder')}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-light-muted dark:border-brand-dark-muted bg-brand-light-bg dark:bg-brand-dark-surface text-brand-light-text dark:text-brand-dark-text placeholder-brand-light-muted focus:outline-none focus:ring-2 focus:ring-brand-green transition resize-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-brand-green hover:opacity-90 text-white font-medium rounded-lg transition-colors self-start"
          >
            {t('contact.send')}
          </button>
        </form>
      </div>
    </section>
  )
}
