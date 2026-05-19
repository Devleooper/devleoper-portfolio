import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const NAV_LINKS = [
  { key: 'about', href: '#about' },
  { key: 'knowledge', href: '#knowledge' },
  { key: 'experience', href: '#experience' },
  { key: 'projects', href: '#projects' },
  { key: 'contact', href: '#contact' },
]

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function LanguageToggle() {
  const { i18n, t } = useTranslation()
  const current = (i18n.resolvedLanguage || i18n.language || 'en').slice(0, 2).toLowerCase()
  const LANGS = ['en', 'es']

  return (
    <div
      role="group"
      aria-label={t('nav.toggleLanguage')}
      className="inline-flex items-center rounded-md border border-brand-light-muted/60 dark:border-brand-dark-muted overflow-hidden font-display"
      style={{ fontSize: '9px' }}
    >
      {LANGS.map((lng) => {
        const active = current === lng
        return (
          <button
            key={lng}
            type="button"
            onClick={() => i18n.changeLanguage(lng)}
            aria-pressed={active}
            className={`px-2 py-1.5 transition-colors ${
              active
                ? 'bg-brand-green text-white'
                : 'text-brand-light-muted dark:text-brand-dark-muted hover:text-brand-light-text dark:hover:text-brand-dark-text hover:bg-brand-light-surface dark:hover:bg-brand-dark-surface'
            }`}
          >
            {lng.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}

export default function Navbar({ isDark, toggleDark }) {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const sections = NAV_LINKS.map(({ href }) =>
      document.querySelector(href)
    ).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-light-bg/90 dark:bg-brand-dark-bg/90 backdrop-blur border-b border-brand-light-muted/40 dark:border-brand-dark-muted/30">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#about"
          className="font-display text-xs font-bold text-brand-light-text dark:text-brand-dark-text hover:text-brand-green transition-colors"
          onClick={handleNavClick}
        >
          {t('nav.logo')}
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ key, href }) => (
            <a
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeSection === href.slice(1)
                  ? 'text-brand-light-text dark:text-brand-yellow bg-brand-yellow/50 dark:bg-brand-yellow/20'
                  : 'text-brand-light-text dark:text-brand-dark-text hover:bg-brand-light-surface dark:hover:bg-brand-dark-surface'
              }`}
            >
              {t(`nav.${key}`)}
            </a>
          ))}

          <LanguageToggle />

          <button
            onClick={toggleDark}
            aria-label={t('nav.toggleDark')}
            className="ml-1 p-2 rounded-md text-brand-light-text dark:text-brand-dark-text hover:bg-brand-light-surface dark:hover:bg-brand-dark-surface transition-colors"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {/* Mobile: lang + dark + hamburger */}
        <div className="flex md:hidden items-center gap-1">
          <LanguageToggle />
          <button
            onClick={toggleDark}
            aria-label={t('nav.toggleDark')}
            className="p-2 rounded-md text-brand-light-text dark:text-brand-dark-text hover:bg-brand-light-surface dark:hover:bg-brand-dark-surface transition-colors"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={t('nav.toggleMenu')}
            className="p-2 rounded-md text-brand-light-text dark:text-brand-dark-text hover:bg-brand-light-surface dark:hover:bg-brand-dark-surface transition-colors"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-brand-light-muted/40 dark:border-brand-dark-muted/30 bg-brand-light-bg dark:bg-brand-dark-bg px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map(({ key, href }) => (
            <a
              key={href}
              href={href}
              onClick={handleNavClick}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === href.slice(1)
                  ? 'text-brand-light-text dark:text-brand-yellow bg-brand-yellow/50 dark:bg-brand-yellow/20'
                  : 'text-brand-light-text dark:text-brand-dark-text hover:bg-brand-light-surface dark:hover:bg-brand-dark-surface'
              }`}
            >
              {t(`nav.${key}`)}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
