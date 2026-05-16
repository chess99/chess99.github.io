import React from 'react'
import { profile } from './data/profile'
import { projects } from './data/projects'
import {
  IconGitHub,
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
      className="group flex flex-col rounded-xl border border-ink/[0.08] bg-white/60 overflow-hidden hover:border-ink/20 hover:shadow-md transition-all duration-200 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2"
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
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink/[0.12] bg-white/60 text-ink/60 hover:text-ink hover:border-ink/25 hover:bg-white/90 transition-all active:scale-95 shadow-sm"
    >
      {children}
    </a>
  )
}

function WechatButton({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="微信公众号"
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink/[0.12] bg-white/60 text-ink/60 hover:text-ink hover:border-ink/25 hover:bg-white/90 transition-all active:scale-95 shadow-sm"
      >
        {children}
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3 shadow-xl max-w-[280px] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={profile.social.wechatQr} alt="微信公众号二维码" className="w-48 h-48 object-contain" />
            <p className="text-[14px] font-medium text-ink/80">极客小屋</p>
            <p className="text-[12px] text-ink/45">微信扫码关注公众号</p>
            <button onClick={() => setOpen(false)} className="text-[12px] text-ink/40 hover:text-ink/60 transition-colors">关闭</button>
          </div>
        </div>
      )}
    </>
  )
}


function ProfileHeader() {
  const socialIcons = (
    <>
      <SocialLink href={profile.social.github} label="GitHub">
        <IconGitHub className="h-[18px] w-[18px]" />
      </SocialLink>

      <WechatButton>
        <IconWechat className="h-[18px] w-[18px]" />
      </WechatButton>

      <SocialLink href={profile.social.jike} label="即刻">
        <IconJike className="h-[18px] w-[18px]" />
      </SocialLink>

      <SocialLink href={profile.social.xiaohongshu} label="小红书">
        <IconXiaohongshu className="h-[18px] w-[18px]" />
      </SocialLink>
    </>
  )

  return (
    <div className="flex flex-col gap-5">
      {/* Single h1 — sr-only on mobile (screen readers announce it), visible on desktop */}
      <h1 className="sr-only lg:not-sr-only lg:text-[28px] lg:font-bold lg:text-ink lg:leading-tight lg:tracking-tight">
        {profile.name}
      </h1>

      {/* Mobile: centered vertical layout */}
      <div className="flex flex-col items-center gap-5 text-center lg:hidden">
        <div className="h-32 w-32 overflow-hidden rounded-2xl border border-ink/10 shadow-sm">
          <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col gap-2">
          {/* Visible name on mobile — h1 is sr-only above, this is the visual counterpart */}
          <p className="text-[26px] font-bold text-ink leading-tight tracking-tight" aria-hidden="true">
            {profile.name}
          </p>
          <p className="text-[13px] text-ink/55 leading-relaxed">{profile.bio}</p>
        </div>

        <div className="flex items-start gap-2.5 text-left">
          <div className="mt-1 h-4 w-0.5 flex-shrink-0 bg-amber-500" />
          <p className="text-[13px] text-ink/70 leading-relaxed">{profile.slogan}</p>
        </div>

        <div className="flex items-center justify-center gap-2.5 flex-wrap">
          {socialIcons}
        </div>

        <nav className="flex items-center gap-5 text-[13px] text-ink/60">
          <a href={profile.blog} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-ink transition-colors py-1">
            <svg className="h-4 w-4 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
            博客
          </a>
        </nav>
      </div>

      {/* Desktop: vertical layout below h1 */}
      <div className="hidden lg:flex lg:flex-col lg:gap-6">
        <div className="h-44 w-44 overflow-hidden rounded-2xl border border-ink/10 shadow-sm">
          {/* alt="" — decorative, adjacent h1 names the person */}
          <img src={profile.avatar} alt="" className="h-full w-full object-cover" />
        </div>

        <p className="text-[13px] text-ink/55 -mt-4">{profile.bio}</p>
        <p className="text-[13px] text-ink/70 leading-relaxed -mt-2">{profile.slogan}</p>

        <div className="flex items-center gap-2 flex-wrap">
          {socialIcons}
        </div>

        <nav className="flex flex-col gap-2.5">
          <NavLink href={profile.blog}>博客</NavLink>
        </nav>
      </div>
    </div>
  )
}

function Sidebar() {
  return (
    <aside className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:self-start lg:overflow-y-auto flex flex-col justify-between">
      <ProfileHeader />

      <div className="hidden lg:block mt-8">
        <p className="text-[11px] text-ink/30">
          © {new Date().getFullYear()} | {profile.domain}
        </p>
      </div>
    </aside>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-[13px] text-ink/60 hover:text-ink transition-colors py-0.5">
      <span className="opacity-60">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
      </span>
      {children}
    </a>
  )
}

export default function App() {
  return (
    <div className="paper min-h-screen">
      <div className="mx-auto max-w-[1200px] px-5 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-3">
            <Sidebar />
          </div>

          <main className="lg:col-span-9 flex flex-col gap-10 lg:gap-12 lg:pt-4">
            {/* 关于我 — desktop only (mobile shows bio/slogan in ProfileHeader) */}
            <section className="hidden lg:flex flex-col gap-5">
              <SectionHeading title="关于我" />
              <div className="flex flex-col gap-3.5 text-[14px] leading-relaxed text-ink/65">
                <p>{profile.slogan}</p>
                <p>{profile.bio}</p>
              </div>
            </section>

            {/* 我的产品 */}
            <section className="flex flex-col gap-5">
              <SectionHeading title="我的产品" />
              {/* Mobile: single column with more breathing room; desktop: 3 cols */}
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
