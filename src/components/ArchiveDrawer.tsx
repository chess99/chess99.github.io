import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import type { Project } from '../data/projects'
import { IconClose, IconExternal } from './icons'

function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const originalStyle = window.getComputedStyle(document.body).overflow
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    
    // Prevent layout shift
    document.body.style.paddingRight = `${scrollbarWidth}px`
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.body.style.overflow = originalStyle
      document.body.style.paddingRight = '0px'
    }
  }, [locked])
}

// Staggered animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 350, damping: 25 } },
}

export function ArchiveDrawer({
  open,
  onClose,
  projects,
}: {
  open: boolean
  onClose: () => void
  projects: Project[]
}) {
  const reduceMotion = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement | null>(null)

  useBodyScrollLock(open)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  const isExternal = (p: Project) => (p.linkType ?? 'external') === 'external'

  const rows = useMemo(() => {
    return projects.map((p) => {
      const external = isExternal(p)
      return (
        <motion.a
          key={p.id}
          variants={reduceMotion ? undefined : itemVariants}
          href={p.href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="group block rounded-2xl border border-ink/10 bg-white/30 px-4 py-4 transition-all duration-200 ease-ios hover:bg-white/60 hover:shadow-sm hover:border-ink/15 focus-ring"
          whileHover={reduceMotion ? undefined : { y: -2 }}
          whileTap={reduceMotion ? undefined : { y: 0, scale: 0.995 }}
        >
          <div className="flex gap-4">
            <div className="h-20 w-36 shrink-0 overflow-hidden rounded-xl border border-ink/10 bg-gradient-to-br from-ink/5 to-transparent opacity-80" />

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-serif text-[22px] leading-tight text-ink group-hover:text-ink/90 transition-colors">
                      {p.title}
                    </h3>
                    {external ? (
                      <IconExternal className="h-4 w-4 shrink-0 text-ink/55 opacity-0 transition-opacity duration-200 ease-ios group-hover:opacity-100" />
                    ) : null}
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-black/5 px-2 py-1 text-[12px] text-ink/70">
                  {p.category}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink/70">
                {p.description}
              </p>
            </div>
          </div>
        </motion.a>
      )
    })
  }, [projects, reduceMotion])

  return (
    <AnimatePresence>
      {open ? (
        <>
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close archive"
            tabIndex={-1}
            className="fixed inset-0 z-40 cursor-default bg-black/10 backdrop-blur-[2px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-ink/10 bg-paper-2/90 shadow-subtle backdrop-blur-md backdrop-saturate-150 md:w-[min(720px,60vw)]"
            role="dialog"
            aria-modal="true"
            aria-label="Complete Archive"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="flex items-center justify-between gap-4 border-b border-ink/10 px-6 py-5">
              <div>
                <div className="font-serif text-[22px] leading-none text-ink">
                  Complete Archive
                </div>
                <div className="mt-2 text-[12px] text-ink/60">
                  A curated list of projects and references.
                </div>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-2 text-ink/70 transition-all duration-200 ease-ios hover:bg-black/5 hover:text-ink active:scale-95 focus-ring"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 overflow-auto px-6 py-4">
              <motion.div
                className="grid gap-3 py-3"
                variants={reduceMotion ? undefined : containerVariants}
                initial="hidden"
                animate="show"
              >
                {rows}
              </motion.div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
