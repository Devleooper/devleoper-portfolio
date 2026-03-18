const TIMELINE = [
  {
    year: '2023 – Present',
    title: 'Senior Frontend Developer',
    org: 'Company Name',
    description:
      'Led development of key product features, improved performance by 40%, and mentored junior engineers.',
  },
  {
    year: '2021 – 2023',
    title: 'Full-Stack Developer',
    org: 'Another Company',
    description:
      'Built REST APIs with Node.js and React dashboards. Collaborated with design and product teams.',
  },
  {
    year: '2019 – 2021',
    title: 'Junior Developer',
    org: 'Startup Inc.',
    description:
      'Developed and maintained client-facing web apps. Gained experience in agile workflows.',
  },
  {
    year: '2015 – 2019',
    title: 'B.Sc. Computer Science',
    org: 'University Name',
    description:
      'Graduated with honours. Focus on algorithms, software engineering, and distributed systems.',
  },
]

export default function Experience() {
  return (
    <section
      id="experience"
      className="min-h-screen flex items-center py-20 pt-24"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
        <h2 className="font-display text-lg sm:text-xl font-bold mb-3 text-brand-light-text dark:text-brand-dark-text leading-relaxed">
          Experience
        </h2>
        <p className="text-brand-light-muted dark:text-brand-dark-muted mb-12">
          My professional journey so far.
        </p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-brand-green/40 dark:bg-brand-green/40 hidden sm:block" />

          <div className="flex flex-col gap-10">
            {TIMELINE.map((item, i) => (
              <div key={i} className="sm:pl-14 relative">
                {/* Dot */}
                <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-brand-green border-2 border-brand-light-bg dark:border-brand-dark-bg hidden sm:block" />

                <span className="text-sm font-medium text-brand-green">
                  {item.year}
                </span>
                <h3 className="font-display text-xs font-semibold text-brand-light-text dark:text-brand-dark-text mt-1 leading-relaxed">
                  {item.title}
                </h3>
                <p className="text-sm text-brand-light-muted dark:text-brand-dark-muted mb-2">
                  {item.org}
                </p>
                <p className="text-brand-light-text dark:text-brand-dark-text leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
