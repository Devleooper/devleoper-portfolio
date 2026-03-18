import { useState, useEffect } from 'react'

function WalkingCat({ name, className }) {
  const frames = [
    `/animations/${name}-1.png`,
    `/animations/${name}-2.png`,
    `/animations/${name}-3.png`,
    `/animations/${name}-4.png`,
  ]
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setFrame(f => (f + 1) % 4), 150)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={`cat-walk cat-walk--${name} ${className}`}>
      <img src={frames[frame]} alt="" aria-hidden="true" />
    </div>
  )
}

export default function AboutMe() {
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
              className="w-full h-full object-contain fade-in-up"
              style={{
                imageRendering: 'pixelated',
                animationDelay: '500ms',
              }}
            />
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
          </div>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-brand-green font-semibold mb-3 text-sm fade-in-up" style={{ animationDelay: '150ms' }}>
            Hi, I&apos;m
          </p>
          <h1 className="font-display text-xl sm:text-2xl font-bold mb-4 text-brand-light-text dark:text-brand-dark-text leading-relaxed fade-in-up" style={{ animationDelay: '300ms' }}>
            Leo , A.K.A. Devleoper
          </h1>
          <h2 className="font-display text-xs sm:text-sm text-brand-light-muted dark:text-brand-dark-muted mb-6 leading-relaxed fade-in-up" style={{ animationDelay: '450ms' }}>
            Senior Software Engineer
          </h2>
          <p className="text-brand-light-text dark:text-brand-dark-text leading-relaxed max-w-xl fade-in-up" style={{ animationDelay: '600ms' }}>
            A technology passionate , with experience building robust,
            production ready applications. curious and always ready to
            Learn and adapt to the future.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="px-6 py-3 bg-brand-green hover:opacity-90 text-white font-medium rounded-lg transition-colors"
            >
              Get in touch
            </a>
            <a
              href="#projects"
              className="px-6 py-3 border border-brand-light-muted dark:border-brand-dark-muted text-brand-light-text dark:text-brand-dark-text hover:bg-brand-light-surface dark:hover:bg-brand-dark-surface font-medium rounded-lg transition-colors"
            >
              View projects
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
