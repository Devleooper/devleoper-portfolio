import { useState, useEffect } from 'react'
import { AnimationContext, SECTION_IDS } from './animationContext'

export function AnimationProvider({ children }) {
  // pre-seed 'about' so hero content is visible immediately on load without flashing
  const [visible, setVisible] = useState(() => new Set(['about']))

  useEffect(() => {
    const sections = SECTION_IDS.map(id => document.getElementById(id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        setVisible(prev => {
          const next = new Set(prev)
          entries.forEach(entry => {
            if (entry.isIntersecting) next.add(entry.target.id)
            else next.delete(entry.target.id)
          })
          return next
        })
      },
      { threshold: 0.12 }
    )

    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <AnimationContext.Provider value={visible}>
      {children}
    </AnimationContext.Provider>
  )
}
