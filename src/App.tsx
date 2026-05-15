import { profile } from './data/profile'
import { projects } from './data/projects'
import {
  IconGitHub,
  IconMail,
  IconJike,
  IconXiaohongshu,
  IconWechat,
} from './components/icons'
import ProductsPage from './pages/ProductsPage'

function useRoute() {
  if (typeof window === 'undefined') return '/'
  return window.location.pathname
}

// idoubi 风格的 section 标题：左侧黄色横线 + 标题，右侧操作链接
function SectionHeading({
  title,
  linkLabel,
  linkHref,
}: {
  title: string
  linkLabel?: string
  linkHref?: string
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* 左侧黄色装饰线 */}
        <div className="h-0.5 w-6 bg-amber-500" />
        <h2 className="text-[15px] font-semibold text-ink tracking-wide">{title}</h2>
      </div>
      {linkLabel && linkHref && (
        <a
          href={linkHref}
          className="flex items-center gap-0.5 text-[13px] text-ink/50 hover:text-ink/80 transition-colors"
        >
          {linkLabel}
          <span className="text-[11px] ml-0.5">↗</span>
        </a>
      )}
    </div>
  )
}

// 产品卡片（横向滚动用）
function ProductCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex-shrink-0 w-[300px] flex flex-col rounded-xl border border-ink/[0.08] bg-white/60 overflow-hidden hover:border-ink/20 hover:shadow-md transition-all duration-200 active:scale-[0.99]"
    >
      {/* Cover */}
      <div className="h-[140px] w-full bg-gradient-to-br from-ink/[0.05] to-ink/[0.02] overflow-hidden flex items-center justify-center">
        {project.cover ? (
          <img src={project.cover} alt={project.title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full" />
        )}
      </div>
      {/* Body */}
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-[15px] font-semibold text-ink leading-tight">{project.title}</h3>
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

function Sidebar() {
  const isTODO = (url: string) => url.includes('TODO')

  return (
    <aside className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:self-start flex flex-col justify-between py-4">
      <div className="flex flex-col gap-6">
        {/* 大方形圆角头像 — 对标 idoubi 风格 */}
        <div className="h-44 w-44 overflow-hidden rounded-2xl border border-ink/10 shadow-sm">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* 名字大字 */}
        <h1 className="text-[28px] font-bold text-ink leading-tight tracking-tight mt-1">
          {profile.name}
        </h1>

        {/* 副标题（bio 作为副标题） */}
        <p className="text-[13px] text-ink/55 -mt-3">{profile.bio}</p>

        {/* slogan */}
        <p className="text-[13px] text-ink/70 leading-relaxed">{profile.slogan}</p>

        {/* 社交图标 — 圆形边框按钮 */}
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/[0.12] bg-white/50 text-ink/60 hover:text-ink hover:border-ink/25 hover:bg-white/80 transition-all"
          >
            <IconGitHub className="h-4 w-4" />
          </a>

          {!isTODO(profile.social.jike) ? (
            <a href={profile.social.jike} target="_blank" rel="noopener noreferrer" aria-label="即刻"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/[0.12] bg-white/50 text-ink/60 hover:text-ink hover:border-ink/25 hover:bg-white/80 transition-all">
              <IconJike className="h-4 w-4" />
            </a>
          ) : (
            <span title="即刻（待补充）" className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/[0.08] bg-white/30 text-ink/20 cursor-default">
              <IconJike className="h-4 w-4" />
            </span>
          )}

          {!isTODO(profile.social.xiaohongshu) ? (
            <a href={profile.social.xiaohongshu} target="_blank" rel="noopener noreferrer" aria-label="小红书"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/[0.12] bg-white/50 text-ink/60 hover:text-ink hover:border-ink/25 hover:bg-white/80 transition-all">
              <IconXiaohongshu className="h-4 w-4" />
            </a>
          ) : (
            <span title="小红书（待补充）" className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/[0.08] bg-white/30 text-ink/20 cursor-default">
              <IconXiaohongshu className="h-4 w-4" />
            </span>
          )}

          <span title="微信公众号（待补充）" className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/[0.08] bg-white/30 text-ink/20 cursor-default">
            <IconWechat className="h-4 w-4" />
          </span>

          <a href={`mailto:${profile.email}`} aria-label="Email"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/[0.12] bg-white/50 text-ink/60 hover:text-ink hover:border-ink/25 hover:bg-white/80 transition-all">
            <IconMail className="h-4 w-4" />
          </a>
        </div>

        {/* 导航链接 */}
        <nav className="flex flex-col gap-2.5 mt-1">
          <NavLink href="https://blog.cearl.cc" icon="book">博客</NavLink>
          <NavLink href="/products" icon="rocket">产品</NavLink>
        </nav>
      </div>

      {/* 底部版权 */}
      <div className="mt-8 lg:mt-0">
        <p className="text-[11px] text-ink/30">
          © {new Date().getFullYear()} | {profile.domain}
        </p>
      </div>
    </aside>
  )
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string
  icon: 'book' | 'rocket' | 'user'
  children: React.ReactNode
}) {
  const icons = {
    book: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    rocket: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      </svg>
    ),
    user: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  }

  return (
    <a
      href={href}
      className="flex items-center gap-2.5 text-[13px] text-ink/60 hover:text-ink transition-colors py-0.5"
    >
      <span className="opacity-60">{icons[icon]}</span>
      {children}
    </a>
  )
}

function HomePage() {
  const featured = projects.slice(0, 6)

  return (
    <main className="flex flex-col gap-12 pt-4">
      {/* 关于我 */}
      <section className="flex flex-col gap-5">
        <SectionHeading title="关于我" />
        <div className="flex flex-col gap-3.5 text-[14px] leading-relaxed text-ink/65 max-w-[600px]">
          <p>{profile.slogan}</p>
          <p>{profile.bio}</p>
        </div>
      </section>

      {/* 我的产品 — 横向滚动 */}
      <section className="flex flex-col gap-5">
        <SectionHeading title="我的产品" linkLabel="查看全部" linkHref="/products" />
        {/* 横向滚动容器，负边距让卡片可以顶边 */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
          {featured.map((p) => (
            <ProductCard key={p.id} project={p} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default function App() {
  const route = useRoute()
  const isProducts = route === '/products'

  return (
    <div className="paper min-h-screen">
      <div className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 md:py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Sidebar — 3 列 */}
          <div className="lg:col-span-3">
            <Sidebar />
          </div>

          {/* 主内容 — 9 列 */}
          <div className="lg:col-span-9">
            {isProducts ? <ProductsPage /> : <HomePage />}
          </div>
        </div>
      </div>
    </div>
  )
}
