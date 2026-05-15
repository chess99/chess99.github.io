import { profile } from './data/profile'
import { projects } from './data/projects'
import {
  IconGitHub,
  IconMail,
  IconJike,
  IconXiaohongshu,
  IconWechat,
} from './components/icons'

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-0.5 w-6 bg-amber-500" />
      <h2 className="text-[15px] font-semibold text-ink tracking-wide">{title}</h2>
    </div>
  )
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl border border-ink/[0.08] bg-white/60 overflow-hidden hover:border-ink/20 hover:shadow-md transition-all duration-200 active:scale-[0.99]"
    >
      <div className="h-[110px] w-full bg-gradient-to-br from-ink/[0.05] to-ink/[0.02] overflow-hidden sm:h-[130px]">
        {project.cover ? (
          <img src={project.cover} alt={project.title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full" />
        )}
      </div>
      <div className="flex flex-col gap-1.5 p-3 sm:gap-2 sm:p-4">
        <h3 className="text-[14px] font-semibold text-ink leading-tight">{project.title}</h3>
        <p className="text-[12px] text-ink/55 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-0.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm border border-ink/[0.1] bg-ink/[0.04] px-1.5 py-0.5 text-[10px] font-medium tracking-wider text-ink/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/[0.12] bg-white/50 text-ink/60 hover:text-ink hover:border-ink/25 hover:bg-white/80 transition-all active:scale-95"
    >
      {children}
    </a>
  )
}

function SocialDisabled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span
      title={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/[0.08] bg-white/30 text-ink/20 cursor-default"
    >
      {children}
    </span>
  )
}

function ProfileHeader() {
  const isTODO = (url: string) => url.includes('TODO')

  return (
    <div className="flex flex-col gap-5">
      {/* Mobile: horizontal layout with avatar + name/bio side by side */}
      <div className="flex items-start gap-4 lg:flex-col lg:gap-5">
        {/* Avatar */}
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-ink/10 shadow-sm lg:h-44 lg:w-44">
          <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
        </div>

        {/* Name + tagline on mobile (beside avatar) */}
        <div className="flex flex-col gap-1 pt-1 lg:hidden">
          <h1 className="text-[22px] font-bold text-ink leading-tight tracking-tight">
            {profile.name}
          </h1>
          <p className="text-[12px] text-ink/50">{profile.nameEn} · {profile.domain}</p>
          <p className="text-[13px] text-ink/65 leading-relaxed mt-1">{profile.slogan}</p>
        </div>
      </div>

      {/* Desktop: name below avatar */}
      <div className="hidden lg:flex lg:flex-col lg:gap-4">
        <h1 className="text-[28px] font-bold text-ink leading-tight tracking-tight mt-1">
          {profile.name}
        </h1>
        <p className="text-[13px] text-ink/55 -mt-2">{profile.bio}</p>
        <p className="text-[13px] text-ink/70 leading-relaxed">{profile.slogan}</p>
      </div>

      {/* Social icons */}
      <div className="flex items-center gap-2 flex-wrap">
        <SocialLink href={profile.social.github} label="GitHub">
          <IconGitHub className="h-4 w-4" />
        </SocialLink>

        {!isTODO(profile.social.jike) ? (
          <SocialLink href={profile.social.jike} label="即刻">
            <IconJike className="h-4 w-4" />
          </SocialLink>
        ) : (
          <SocialDisabled label="即刻（待补充）">
            <IconJike className="h-4 w-4" />
          </SocialDisabled>
        )}

        {!isTODO(profile.social.xiaohongshu) ? (
          <SocialLink href={profile.social.xiaohongshu} label="小红书">
            <IconXiaohongshu className="h-4 w-4" />
          </SocialLink>
        ) : (
          <SocialDisabled label="小红书（待补充）">
            <IconXiaohongshu className="h-4 w-4" />
          </SocialDisabled>
        )}

        <SocialDisabled label="微信公众号（待补充）">
          <IconWechat className="h-4 w-4" />
        </SocialDisabled>

        <SocialLink href={`mailto:${profile.email}`} label="Email">
          <IconMail className="h-4 w-4" />
        </SocialLink>

        {/* Blog link inline on mobile */}
        <a
          href="https://blog.cearl.cc"
          className="flex items-center gap-1.5 h-10 rounded-full border border-ink/[0.12] bg-white/50 px-3 text-[12px] text-ink/60 hover:text-ink hover:border-ink/25 hover:bg-white/80 transition-all active:scale-95 lg:hidden"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
          博客
        </a>
      </div>

      {/* Desktop nav links */}
      <nav className="hidden lg:flex flex-col gap-2.5 mt-1">
        <NavLink href="https://blog.cearl.cc" icon="book">博客</NavLink>
      </nav>
    </div>
  )
}

function Sidebar() {
  return (
    <aside className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:self-start flex flex-col justify-between py-4">
      <ProfileHeader />

      <div className="mt-6 lg:mt-0">
        <p className="text-[11px] text-ink/30">
          © {new Date().getFullYear()} | {profile.domain}
        </p>
      </div>
    </aside>
  )
}

function NavLink({ href, icon, children }: { href: string; icon: 'book'; children: React.ReactNode }) {
  const icons = {
    book: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  }

  return (
    <a href={href} className="flex items-center gap-2.5 text-[13px] text-ink/60 hover:text-ink transition-colors py-0.5">
      <span className="opacity-60">{icons[icon]}</span>
      {children}
    </a>
  )
}

export default function App() {
  return (
    <div className="paper min-h-screen">
      <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-3">
            <Sidebar />
          </div>

          <main className="lg:col-span-9 flex flex-col gap-8 lg:gap-12 lg:pt-4">
            {/* 关于我 — only show bio on mobile (slogan shown in header) */}
            <section className="flex flex-col gap-4">
              <SectionHeading title="关于我" />
              <div className="flex flex-col gap-3 text-[14px] leading-relaxed text-ink/65">
                {/* On mobile show both, on desktop the sidebar already shows them */}
                <p className="lg:hidden">{profile.bio}</p>
                <p className="hidden lg:block">{profile.slogan}</p>
                <p className="hidden lg:block">{profile.bio}</p>
                <p className="lg:hidden">{profile.slogan}</p>
              </div>
            </section>

            {/* 我的产品 */}
            <section className="flex flex-col gap-4">
              <SectionHeading title="我的产品" />
              <div className="grid gap-3 grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {projects.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
