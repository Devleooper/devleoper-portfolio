import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import AboutMe from './sections/AboutMe'
import Knowledge from './sections/Knowledge'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Contact from './sections/Contact'

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleDark = () => {
    const root = document.documentElement
    root.classList.add('theme-transition')
    setIsDark((prev) => !prev)

    window.setTimeout(() => {
      root.classList.remove('theme-transition')
    }, 350)
  }

  return (
    <div className="bg-brand-light-bg dark:bg-brand-dark-bg text-brand-light-text dark:text-brand-dark-text min-h-screen">
      <Navbar isDark={isDark} toggleDark={toggleDark} />
      <main>
        <AboutMe />
        <Knowledge />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}

export default App
