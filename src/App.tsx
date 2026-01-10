import { motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { ArchiveDrawer } from './components/ArchiveDrawer'
import { IconGitHub, IconMail } from './components/icons'
import { featuredProjects, projects } from './data/projects'
import { profile } from './data/profile'

function FeaturedItem({
  ordinal,
  title,
  description,
  href,
  external,
}: {
  ordinal?: string
  title: string
  description: string
  href: string
  external: boolean
}) {
  return (
    <a
      className="group flex items-start gap-3 rounded-2xl border border-ink/10 bg-white/30 px-3 py-3 transition-all duration-200 ease-ios hover:bg-white/60 hover:shadow-sm hover:border-ink/15 active:scale-[0.98] focus-ring"
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      <div className="mt-1 h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-ink/10 bg-gradient-to-br from-ink/10 to-transparent opacity-80" />
      <div className="min-w-0">
        <div className="text-[12px] tracking-[0.14em] text-ink/60 group-hover:text-ink/80 transition-colors">
          {ordinal ?? ''}
        </div>
        <div className="mt-0.5 truncate text-[14px] font-medium text-ink">
          {title}
        </div>
        <div className="mt-1 text-[12px] leading-relaxed text-ink/70">
          {description}
        </div>
      </div>
    </a>
  )
}

export default function App() {
  const reduceMotion = useReducedMotion()
  const [archiveOpen, setArchiveOpen] = useState(false)

  const featured = useMemo(() => {
    return featuredProjects.slice(0, 4).map((p) => (
      <FeaturedItem
        key={p.id}
        ordinal={p.ordinal}
        title={p.title}
        description={p.description}
        href={p.href}
        external={(p.linkType ?? 'external') === 'external'}
      />
    ))
  }, [])

  return (
    <div className="paper flex min-h-screen flex-col">
      <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-5 py-20 md:px-10 md:py-32">
        <div className="grid items-center gap-16 md:grid-cols-12 md:gap-12">
          {/* Left: statement */}
          <motion.section
            className="md:col-span-8"
            animate={
              archiveOpen && !reduceMotion
                ? { x: -16, opacity: 0.72 }
                : { x: 0, opacity: 1 }
            }
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="whitespace-pre-line font-serif text-[58px] leading-[0.92] tracking-[-0.02em] text-ink md:text-[92px]">
              {profile.statement}
            </h1>

            <div className="mt-10 flex items-center gap-3 text-ink/70 md:mt-12">
              <a
                className="rounded-full p-2 transition-all duration-200 ease-ios hover:bg-black/5 hover:text-ink active:scale-95 focus-ring"
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <IconGitHub className="h-5 w-5" />
              </a>
              <a
                className="rounded-full p-2 transition-all duration-200 ease-ios hover:bg-black/5 hover:text-ink active:scale-95 focus-ring"
                href={`mailto:${profile.email}`}
                aria-label="Email"
              >
                <IconMail className="h-5 w-5" />
              </a>
            </div>
          </motion.section>

          {/* Right: featured */}
          <motion.aside
            className="md:col-span-4 md:pt-4"
            animate={archiveOpen && !reduceMotion ? { opacity: 0.9 } : { opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-[11px] font-medium tracking-[0.18em] text-ink/60">
              FEATURED PROJECTS
            </div>
            <div className="mt-4 grid gap-3">{featured}</div>

            <button
              type="button"
              onClick={() => setArchiveOpen(true)}
              className="group mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-ink/80 transition-colors duration-200 ease-ios hover:text-ink focus-ring"
            >
              <span className="underline decoration-ink/25 underline-offset-4 transition-all group-hover:decoration-ink/50">
                View all projects
              </span>
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </button>
          </motion.aside>
        </div>
      </main>

      <footer className="mx-auto w-full max-w-[1200px] px-5 py-8 text-[12px] text-ink/40 md:px-10">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </div>
          <div className="flex gap-6">
            <span className="opacity-50">Designed & Built with Care</span>
          </div>
        </div>
      </footer>

      <ArchiveDrawer
        open={archiveOpen}
        onClose={() => setArchiveOpen(false)}
        projects={projects}
      />
    </div>
  )
}
