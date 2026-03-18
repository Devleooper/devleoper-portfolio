const SKILLS = {
  Languages: ['JavaScript', 'TypeScript', 'Python', 'HTML', 'CSS'],
  Frameworks: ['React', 'Node.js', 'Express', 'Next.js', 'Tailwind CSS'],
  Tools: ['Git', 'Docker', 'Vite', 'VS Code', 'Linux'],
  Databases: ['PostgreSQL', 'MongoDB', 'Redis', 'SQLite'],
}

export default function Knowledge() {
  return (
    <section
      id="knowledge"
      className="min-h-screen flex items-center py-20 pt-24 bg-brand-light-surface/80 dark:bg-brand-dark-surface/50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
        <h2 className="font-display text-lg sm:text-xl font-bold mb-3 text-brand-light-text dark:text-brand-dark-text leading-relaxed">
          Knowledge
        </h2>
        <p className="text-brand-light-muted dark:text-brand-dark-muted mb-12">
          Technologies and tools I work with.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {Object.entries(SKILLS).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-display text-xs font-semibold text-brand-green mb-4 leading-relaxed">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-brand-light-bg dark:bg-brand-dark-surface border border-brand-light-muted dark:border-brand-dark-muted rounded-full text-sm text-brand-light-text dark:text-brand-dark-text shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
