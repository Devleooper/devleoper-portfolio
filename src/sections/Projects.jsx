const PROJECTS = [
  {
    title: 'Project Alpha',
    description:
      'A full-stack web application built with React and Node.js. Features authentication, real-time updates, and a clean dashboard.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    demo: '#',
    source: '#',
  },
  {
    title: 'Project Beta',
    description:
      'CLI tool that automates repetitive development tasks, saving hours of manual work per week.',
    tags: ['TypeScript', 'Node.js'],
    demo: null,
    source: '#',
  },
  {
    title: 'Project Gamma',
    description:
      'Open-source library providing a collection of reusable React hooks for common UI patterns.',
    tags: ['React', 'TypeScript', 'Open Source'],
    demo: '#',
    source: '#',
  },
  {
    title: 'Project Delta',
    description:
      'Mobile-first e-commerce storefront with optimised images, lazy loading, and sub-1-second TTI.',
    tags: ['Next.js', 'Tailwind CSS', 'Stripe'],
    demo: '#',
    source: null,
  },
]

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen flex items-center py-20 pt-24 bg-brand-light-surface/80 dark:bg-brand-dark-surface/50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
        <h2 className="font-display text-lg sm:text-xl font-bold mb-3 text-brand-light-text dark:text-brand-dark-text leading-relaxed">
          Projects
        </h2>
        <p className="text-brand-light-muted dark:text-brand-dark-muted mb-12">
          A selection of things I&apos;ve built.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="bg-brand-light-bg dark:bg-brand-dark-surface border border-brand-light-muted dark:border-brand-dark-muted rounded-xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-display text-xs font-semibold text-brand-light-text dark:text-brand-dark-text leading-relaxed">
                {project.title}
              </h3>
              <p className="text-brand-light-text dark:text-brand-dark-text text-sm leading-relaxed flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-brand-yellow/50 dark:bg-brand-yellow/20 text-brand-light-text dark:text-brand-yellow text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 pt-1">
                {project.demo && (
                  <a
                    href={project.demo}
                    className="text-sm font-medium text-brand-green hover:underline"
                  >
                    Live demo →
                  </a>
                )}
                {project.source && (
                  <a
                    href={project.source}
                    className="text-sm font-medium text-brand-light-text dark:text-brand-dark-muted hover:underline"
                  >
                    Source code
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
