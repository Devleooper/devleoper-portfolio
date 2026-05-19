import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const VIEWPORT_MARGIN = 8
const GAP_ABOVE_ICON = 12

export default function TechIcon({ name, icon, color, fact, size = 'md' }) {
  const Icon = icon
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ left: 0, top: 0, arrowLeft: '50%' })
  const ref = useRef(null)
  const tooltipRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (
        ref.current && !ref.current.contains(e.target) &&
        tooltipRef.current && !tooltipRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', handler)
    return () => document.removeEventListener('pointerdown', handler)
  }, [open])

  // Position the portaled tooltip in viewport coordinates, clamping to screen.
  useLayoutEffect(() => {
    if (!open || !ref.current || !tooltipRef.current) return
    const iconRect = ref.current.getBoundingClientRect()
    const tooltipWidth = tooltipRef.current.offsetWidth
    const tooltipHeight = tooltipRef.current.offsetHeight
    const iconCenter = iconRect.left + iconRect.width / 2

    let left = iconCenter - tooltipWidth / 2
    left = Math.max(VIEWPORT_MARGIN, Math.min(left, window.innerWidth - tooltipWidth - VIEWPORT_MARGIN))
    const top = iconRect.top - tooltipHeight - GAP_ABOVE_ICON
    const arrowLeft = `${iconCenter - left}px`

    setPos({ left, top, arrowLeft })
  }, [open])

  const dims = size === 'sm'
    ? { box: 'w-8 h-8', icon: 18 }
    : { box: 'w-11 h-11', icon: 22 }

  return (
    <div
      ref={ref}
      className="relative cursor-default"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
    >
      <div className={`${dims.box} flex items-center justify-center rounded-lg
        bg-white dark:bg-brand-dark-bg
        border shadow-sm transition-colors duration-150
        ${open
          ? 'border-brand-green shadow-md'
          : 'border-brand-light-muted/60 dark:border-brand-dark-muted'
        }`}>
        <span className={`flex items-center justify-center transition-transform duration-200 ${open ? 'scale-125' : ''}`}>
          <Icon size={dims.icon} style={{ color }} />
        </span>
      </div>

      {createPortal(
        <div
          ref={tooltipRef}
          className={`
            pointer-events-none fixed z-50
            ${fact ? 'w-52 px-3 py-2.5' : 'px-2.5 py-1.5 whitespace-nowrap'}
            rounded-lg
            bg-brand-light-bg dark:bg-brand-dark-bg
            border border-brand-green/50
            shadow-lg transition-opacity duration-150
            ${open ? 'opacity-100' : 'opacity-0'}
          `}
          style={{ left: pos.left, top: pos.top }}
        >
          <p className="font-display text-brand-green leading-relaxed" style={{ fontSize: '9px' }}>{name}</p>
          {fact && (
            <p className="text-xs leading-relaxed text-brand-light-text dark:text-brand-dark-text mt-1.5">{fact}</p>
          )}
          <span
            className="absolute top-full border-4 border-transparent border-t-brand-green/50"
            style={{ left: pos.arrowLeft, transform: 'translateX(-50%)' }}
          />
        </div>,
        document.body
      )}
    </div>
  )
}
