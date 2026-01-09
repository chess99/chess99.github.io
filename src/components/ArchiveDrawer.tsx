import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import type { Project } from '../data/projects'
import { IconClose, IconExternal } from './icons'

function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prev
    }
  }, [locked])
}

function SkeletonRow() {
  return (
    <div className="flex gap-4 py-5">
      <div className="h-20 w-36 shrink-0 rounded-lg bg-black/5" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <div className="h-5 w-40 rounded bg-black/5" />
          <div className="h-5 w-16 rounded bg-black/5" />
        </div>
        <div className="mt-2 h-4 w-[92%] rounded bg-black/5" />
        <div className="mt-2 h-4 w-[70%] rounded bg-black/5" />
      </div>
    </div>
  )
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
          href={p.href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="group block rounded-2xl border border-ink/10 bg-white/30 px-4 py-4 transition-colors duration-200 ease-ios hover:bg-white/45 focus-ring"
          whileHover={reduceMotion ? undefined : { y: -2 }}
          whileTap={reduceMotion ? undefined : { y: 0, scale: 0.995 }}
        >
          <div className="flex gap-4">
            <div className="h-20 w-36 shrink-0 overflow-hidden rounded-xl border border-ink/10 bg-gradient-to-br from-black/5 to-black/0" />

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-serif text-[22px] leading-tight text-ink">
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
            className="fixed inset-0 z-40 cursor-default bg-black/10"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-ink/10 bg-paper-2/90 shadow-subtle backdrop-blur md:w-[min(720px,60vw)]"
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
                className="rounded-full p-2 text-ink/70 transition-colors duration-200 ease-ios hover:bg-black/5 hover:text-ink focus-ring"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 overflow-auto px-6 py-4">
              {/* Skeleton → content crossfade (no state needed; drawer unmounts on close) */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{
                    opacity: 0,
                    transition: { delay: reduceMotion ? 0 : 0.32, duration: reduceMotion ? 0 : 0.18 },
                    transitionEnd: { display: 'none' },
                  }}
                >
                  <div className="divide-y divide-ink/10">
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { delay: reduceMotion ? 0 : 0.32, duration: reduceMotion ? 0 : 0.22 },
                  }}
                  className="grid gap-3 py-3"
                >
                  {rows}
                </motion.div>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
