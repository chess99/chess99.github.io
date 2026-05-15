import { motion, useReducedMotion } from 'framer-motion'
import { profile } from './data/profile'
import { projects } from './data/projects'
import {
  IconGitHub,
  IconMail,
  IconJike,
  IconXiaohongshu,
  IconWechat,
} from './components/icons'

function Nav() {
  return (
    <nav className="mx-auto flex w-full max-w-[860px] items-center justify-between px-5 py-6 md:px-8 md:py-8">
      <a
        href="/"
        className="font-serif text-[18px] font-medium text-ink transition-opacity hover:opacity-70"
      >
        {profile.name}
      </a>
      <div className="flex items-center gap-1 text-ink/60">
        <a
          href={profile.social.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="rounded-full p-2 transition-all duration-200 ease-ios hover:bg-black/5 hover:text-ink active:scale-95 focus-ring"
        >
          <IconGitHub className="h-4 w-4" />
        </a>
        <span
          title="即刻（即将添加）"
          aria-label="即刻"
          className="rounded-full p-2 cursor-default text-ink/30"
        >
          <IconJike className="h-4 w-4" />
        </span>
        <span
          title="小红书（即将添加）"
          aria-label="小红书"
          className="rounded-full p-2 cursor-default text-ink/30"
        >
          <IconXiaohongshu className="h-4 w-4" />
        </span>
        <span
          title="微信公众号（即将添加）"
          aria-label="微信公众号"
          className="rounded-full p-2 cursor-default text-ink/30"
        >
          <IconWechat className="h-4 w-4" />
        </span>
        <a
          href={`mailto:${profile.email}`}
          aria-label="Email"
          className="rounded-full p-2 transition-all duration-200 ease-ios hover:bg-black/5 hover:text-ink active:scale-95 focus-ring"
        >
          <IconMail className="h-4 w-4" />
        </a>
      </div>
    </nav>
  )
}

function Hero() {
  const reduceMotion = useReducedMotion()
  return (
    <motion.section
      className="mx-auto w-full max-w-[860px] px-5 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="h-20 w-20 rounded-full border border-ink/10 object-cover md:h-24 md:w-24"
        />
        <div>
          <h1 className="font-serif text-[32px] leading-tight text-ink md:text-[40px]">
            {profile.name}
            <span className="ml-3 font-sans text-[18px] font-normal text-ink/50 md:text-[22px]">
              {profile.nameEn}
            </span>
          </h1>
          <p className="mt-2 text-[15px] font-medium text-ink/80 md:text-[17px]">
            {profile.slogan}
          </p>
          <p className="mt-2 max-w-[480px] text-[13px] leading-relaxed text-ink/60 md:text-[14px]">
            {profile.bio}
          </p>
        </div>
      </div>
    </motion.section>
  )
}

function ProjectCard({
  title,
  description,
  href,
  tags,
  index,
}: {
  title: string
  description: string
  href: string
  tags: string[]
  index: number
}) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 rounded-2xl border border-ink/10 bg-white/40 p-4 transition-all duration-200 ease-ios hover:bg-white/70 hover:shadow-sm hover:border-ink/15 active:scale-[0.98] focus-ring"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="h-32 w-full rounded-xl border border-ink/[0.08] bg-gradient-to-br from-ink/[0.06] to-transparent" />
      <div>
        <h3 className="text-[15px] font-medium text-ink group-hover:text-ink/90 transition-colors">
          {title}
        </h3>
        <p className="mt-1 text-[12px] leading-relaxed text-ink/60">{description}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-medium tracking-wide text-ink/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  )
}

function Projects() {
  return (
    <section className="mx-auto w-full max-w-[860px] px-5 pb-20 md:px-8">
      <div className="mb-5 text-[11px] font-medium tracking-[0.18em] text-ink/50">
        PROJECTS
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.id}
            title={p.title}
            description={p.description}
            href={p.href}
            tags={p.tags}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div className="paper flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Projects />
      </main>
      <footer className="mx-auto w-full max-w-[860px] px-5 py-6 text-[12px] text-ink/40 md:px-8">
        <div className="flex items-center justify-between">
          <span suppressHydrationWarning>© {new Date().getFullYear()} {profile.name}</span>
          <span>{profile.domain}</span>
        </div>
      </footer>
    </div>
  )
}
