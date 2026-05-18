import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useHasSeen } from '../context/AnimationContext'
import {
  SiOpenjdk, SiJavascript, SiTypescript, SiHtml5, SiCss,
  SiSpring, SiReact, SiAngular, SiNestjs, SiExpress, SiFlutter,
  SiGit, SiDocker, SiGooglecloud, SiFirebase, SiLinux,
  SiClaude, SiOpenai,
  SiPostgresql, SiMysql, SiMongodb,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'

const SKILLS = [
  {
    categoryKey: 'languages',
    items: [
      { key: 'java',       name: 'Java',       icon: SiOpenjdk,    color: '#EA2D2E' },
      { key: 'javascript', name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { key: 'typescript', name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { key: 'html',       name: 'HTML',       icon: SiHtml5,      color: '#E34F26' },
      { key: 'css',        name: 'CSS',        icon: SiCss,        color: '#1572B6' },
    ],
  },
  {
    categoryKey: 'frameworks',
    items: [
      { key: 'spring',  name: 'Spring',  icon: SiSpring,  color: '#6DB33F' },
      { key: 'react',   name: 'React',   icon: SiReact,   color: '#61DAFB' },
      { key: 'angular', name: 'Angular', icon: SiAngular, color: '#DD0031' },
      { key: 'nest',    name: 'NestJS',  icon: SiNestjs,  color: '#E0234E' },
      { key: 'express', name: 'Express', icon: SiExpress, color: '#888888' },
      { key: 'flutter', name: 'Flutter', icon: SiFlutter, color: '#02569B' },
    ],
  },
  {
    categoryKey: 'tools',
    items: [
      { key: 'git',      name: 'Git',      icon: SiGit,          color: '#F05032' },
      { key: 'docker',   name: 'Docker',   icon: SiDocker,       color: '#2496ED' },
      { key: 'aws',      name: 'AWS',      icon: FaAws,          color: '#FF9900' },
      { key: 'gcp',      name: 'GCP',      icon: SiGooglecloud,  color: '#4285F4' },
      { key: 'firebase', name: 'Firebase', icon: SiFirebase,     color: '#FFCA28' },
      { key: 'linux',    name: 'Linux',    icon: SiLinux,        color: '#888888' },
      { key: 'claude',   name: 'Claude',   icon: SiClaude,       color: '#D97757' },
      { key: 'codex',    name: 'Codex',    icon: SiOpenai,       color: '#10A37F' },
    ],
  },
  {
    categoryKey: 'databases',
    items: [
      { key: 'postgresql', name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { key: 'mysql', name: 'MySQL',      icon: SiMysql,      color: '#4479A1' },
      { key: 'mongo', name: 'MongoDB',    icon: SiMongodb,    color: '#47A248' },
    ],
  },
]

function SkillIcon({ name, icon: Icon, color, fact }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', handler)
    return () => document.removeEventListener('pointerdown', handler)
  }, [open])

  return (
    <div
      ref={ref}
      className="relative cursor-default"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
    >
      <div className={`w-11 h-11 flex items-center justify-center rounded-lg
        bg-white dark:bg-brand-dark-bg
        border shadow-sm transition-colors duration-150
        ${open
          ? 'border-brand-green shadow-md'
          : 'border-brand-light-muted/60 dark:border-brand-dark-muted'
        }`}>
        <span className={`flex items-center justify-center transition-transform duration-200 ${open ? 'scale-125' : ''}`}>
          <Icon size={22} style={{ color }} />
        </span>
      </div>

      {/* Tooltip */}
      <div className={`
        pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-52 z-20
        px-3 py-2.5 rounded-lg
        bg-brand-light-bg dark:bg-brand-dark-bg
        border border-brand-green/50
        shadow-lg transition-all duration-150 origin-bottom
        ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
      `}>
        <p className="font-display text-brand-green mb-1.5 leading-relaxed" style={{ fontSize: '9px' }}>{name}</p>
        <p className="text-xs leading-relaxed text-brand-light-text dark:text-brand-dark-text">{fact}</p>
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-brand-green/50" />
      </div>
    </div>
  )
}

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

        {/* ID Card */}
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
              {SKILLS.map(({ categoryKey, items }, catIdx) => (
                <div
                  key={categoryKey}
                  className={`p-5 ${inView ? 'fade-in-up' : 'opacity-0'}`}
                  style={inView ? { animationDelay: `${300 + catIdx * 120}ms` } : undefined}
                >
                  <h3 className="font-display text-brand-green mb-3 leading-relaxed" style={{ fontSize: '8px' }}>
                    {t(`knowledge.categories.${categoryKey}`)}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <SkillIcon
                        key={skill.key}
                        name={skill.name}
                        icon={skill.icon}
                        color={skill.color}
                        fact={t(`knowledge.skills.${skill.key}`)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
