import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SiGithub, SiInstagram } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { useHasSeen } from '../context/AnimationContext'

const LINKS = [
  { label: 'GitHub',    href: 'https://github.com/devleooper',            icon: SiGithub    },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/lruizsuarez/', icon: FaLinkedin  },
  { label: 'Instagram', href: 'https://www.instagram.com/devleoper.log/', icon: SiInstagram },
]

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdajkdpy'

const baseFieldClass = 'w-full px-4 py-2.5 rounded-lg border bg-brand-light-bg dark:bg-brand-dark-surface text-brand-light-text dark:text-brand-dark-text placeholder-brand-light-muted focus:outline-none focus:ring-2 transition disabled:opacity-60'

function fieldClass(hasError) {
  return `${baseFieldClass} ${
    hasError
      ? 'border-red-500 focus:ring-red-500'
      : 'border-brand-light-muted dark:border-brand-dark-muted focus:ring-brand-green'
  }`
}

export default function Contact() {
  const { t } = useTranslation()
  const inView = useHasSeen('contact')

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validate = (values) => {
    const next = {}
    if (!values.name.trim()) next.name = 'required'
    if (!values.email.trim()) next.email = 'required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = 'invalidEmail'
    if (!values.message.trim()) next.message = 'required'
    return next
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'submitting') return
    const v = validate(form)
    if (Object.keys(v).length) {
      setErrors(v)
      return
    }
    setStatus('submitting')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Portfolio contact - ${form.name}`,
          _replyto: form.email,
          message: form.message,
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const resetForm = () => {
    setForm({ name: '', email: '', message: '' })
    setErrors({})
    setStatus('idle')
  }

  const isSubmitting = status === 'submitting'
  const showThanks = status === 'success'

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center py-20 pt-24"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full text-center">
        <h2 className={`font-display text-lg sm:text-xl font-bold mb-3 text-brand-light-text dark:text-brand-dark-text leading-relaxed ${inView ? 'fade-in-up' : 'opacity-0'}`}>
          {t('contact.title')}
        </h2>
        <p
          className={`text-brand-light-muted dark:text-brand-dark-muted mb-12 ${inView ? 'fade-in-up' : 'opacity-0'}`}
          style={inView ? { animationDelay: '120ms' } : undefined}
        >
          {t('contact.subtitle')}
        </p>

        {/* Quick links */}
        <div
          className={`flex justify-center gap-5 mb-12 ${inView ? 'fade-in-up' : 'opacity-0'}`}
          style={inView ? { animationDelay: '240ms' } : undefined}
        >
          {LINKS.map(({ label, href, icon }) => {
            const Icon = icon
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="group flex items-center justify-center w-12 h-12 rounded-xl bg-brand-light-bg dark:bg-brand-dark-surface border border-brand-light-muted/60 dark:border-brand-dark-muted shadow-sm hover:shadow-md hover:border-brand-green/60 transition-all"
              >
                <Icon
                  size={22}
                  className="text-brand-light-text dark:text-brand-dark-text group-hover:text-brand-green transition-colors duration-200"
                />
              </a>
            )
          })}
        </div>

        {showThanks ? (
          <div
            className={`bg-brand-light-surface/80 dark:bg-brand-dark-surface/50 border border-brand-green/50 rounded-xl p-8 flex flex-col items-center gap-4 ${inView ? 'fade-in-up' : 'opacity-0'}`}
            style={inView ? { animationDelay: '360ms' } : undefined}
          >
            <p className="font-display text-brand-green leading-relaxed" style={{ fontSize: '12px' }}>
              {t('contact.thanksTitle')}
            </p>
            <p className="text-brand-light-text dark:text-brand-dark-text">
              {t('contact.thanksBody')}
            </p>
            <button
              type="button"
              onClick={resetForm}
              className="text-sm font-medium text-brand-green hover:underline"
            >
              {t('contact.sendAnother')}
            </button>
          </div>
        ) : (
          <form
            noValidate
            className={`bg-brand-light-surface/80 dark:bg-brand-dark-surface/50 border border-brand-light-muted dark:border-brand-dark-muted rounded-xl p-8 text-left flex flex-col gap-5 ${inView ? 'fade-in-up' : 'opacity-0'}`}
            style={inView ? { animationDelay: '360ms' } : undefined}
            onSubmit={onSubmit}
          >
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-brand-light-text dark:text-brand-dark-text mb-1.5">
                {t('contact.name')}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={form.name}
                onChange={onChange}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                placeholder={t('contact.namePlaceholder')}
                className={fieldClass(errors.name)}
              />
              {errors.name && (
                <p id="contact-name-error" className="mt-1.5 text-xs text-red-500">
                  {t(`contact.errors.${errors.name}`)}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-brand-light-text dark:text-brand-dark-text mb-1.5">
                {t('contact.email')}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                placeholder={t('contact.emailPlaceholder')}
                className={fieldClass(errors.email)}
              />
              {errors.email && (
                <p id="contact-email-error" className="mt-1.5 text-xs text-red-500">
                  {t(`contact.errors.${errors.email}`)}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-brand-light-text dark:text-brand-dark-text mb-1.5">
                {t('contact.message')}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={form.message}
                onChange={onChange}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                placeholder={t('contact.messagePlaceholder')}
                className={`${fieldClass(errors.message)} resize-none`}
              />
              {errors.message && (
                <p id="contact-message-error" className="mt-1.5 text-xs text-red-500">
                  {t(`contact.errors.${errors.message}`)}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-brand-green hover:opacity-90 text-white font-medium rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('contact.sending') : t('contact.send')}
              </button>
              {status === 'error' && (
                <span className="text-sm text-red-500 font-medium">
                  {t('contact.error')}
                </span>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
