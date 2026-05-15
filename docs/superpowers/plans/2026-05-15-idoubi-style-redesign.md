# 晨笙 cearl.cc 首页重设计实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 cearl.cc 首页改版为类 idoubi.ai 风格的个人主站，包含头像、简介、项目展示（带 tag）和社交链接，去掉原有的 statement 大字和 archive drawer 布局。

**Architecture:** 单页垂直滚动布局，保留现有 React + Vite + Tailwind + framer-motion 技术栈；重写 `App.tsx` 为新布局，删除 `ArchiveDrawer`；`profile.ts` 和 `projects.ts` 更新内容；头像图片从 blog 仓库复制过来。

**Tech Stack:** React 19, Vite, TypeScript, Tailwind CSS 3, framer-motion 12, SSR prerender

---

## 设计参考速查

idoubi.ai 首页结构（从上到下）：
1. **Nav** — logo 名字（左）+ 社交图标链接（中/右）+ 暗色模式切换（右）
2. **Hero** — 头像 + 名字 + 一句话 slogan + 简介段落 + "了解更多" 链接
3. **产品 section** — 网格卡片，每张卡片：截图/封面图、名称、一句描述、tag 标签（如 `AI` `NEXT.JS`）
4. **Footer** — © 年份 | cearl.cc

我们的版本差异：
- 不做"近期文章"板块
- 不做暗色模式切换（保留现有 paper/ink 调色板）
- 社交图标：GitHub（已有）+ 即刻（占位）+ 小红书（占位）+ 微信公众号（占位）
- 产品列表见 Task 3

---

## 文件结构

| 操作 | 路径 | 说明 |
|------|------|------|
| 修改 | `src/App.tsx` | 整体重写为新布局 |
| 修改 | `src/data/profile.ts` | 加头像路径、slogan、简介、社交账号 |
| 修改 | `src/data/projects.ts` | 更新为真实项目列表，加 tags 字段 |
| 修改 | `src/components/icons.tsx` | 加即刻、小红书、微信图标 SVG |
| 删除 | `src/components/ArchiveDrawer.tsx` | 新设计不再需要 |
| 新增 | `public/avatar.png` | 从 blog 仓库复制头像 |

---

## Task 1：复制头像、更新 profile 数据

**Files:**
- Modify: `src/data/profile.ts`
- Add: `public/avatar.png`

- [ ] **Step 1: 复制头像图片**

```bash
cp /Users/zcs/code2/blog/source/images/avatar.png /Users/zcs/code2/chess99.github.io/public/avatar.png
```

- [ ] **Step 2: 更新 profile.ts**

完整替换 `src/data/profile.ts`：

```typescript
export const profile = {
  name: '晨笙',
  nameEn: 'Cearl',
  domain: 'cearl.cc',
  slogan: '用代码理解世界，用写作整理思考。',
  bio: '软件工程师，专注 AI 编程与工程效能。写代码、读书、记录。',
  avatar: '/avatar.png',
  email: 'hello@cearl.cc',
  social: {
    github: 'https://github.com/chess99',
    jike: 'https://web.okjike.com/u/TODO',        // 待补充
    xiaohongshu: 'https://www.xiaohongshu.com/user/profile/TODO', // 待补充
    wechat: 'TODO',                                 // 待补充（公众号名称或二维码 URL）
  },
}
```

- [ ] **Step 3: Commit**

```bash
git add public/avatar.png src/data/profile.ts
git commit -m "feat: add avatar and update profile data"
```

---

## Task 2：更新 projects 数据，加 tags 字段

**Files:**
- Modify: `src/data/projects.ts`

- [ ] **Step 1: 替换 projects.ts**

完整替换 `src/data/projects.ts`：

```typescript
export interface Project {
  id: string
  title: string
  description: string
  href: string
  tags: string[]
  cover?: string  // 可选封面图 URL 或本地路径
}

export const projects: Project[] = [
  {
    id: 'blog',
    title: '博客',
    description: 'AI 编程、软件工程与技术思考。',
    href: 'https://blog.cearl.cc',
    tags: ['WRITING', 'HEXO'],
  },
  {
    id: 'news-intel',
    title: 'News Intel',
    description: 'AI 驱动的新闻聚合与摘要。',
    href: 'https://news.cearl.cc',
    tags: ['AI', 'NEWS'],
  },
  {
    id: 'ai-reading',
    title: 'AI Reading',
    description: 'AI 相关论文与资料的阅读笔记。',
    href: 'https://cearl.cc/ai-reading/',
    tags: ['AI', 'NOTES'],
  },
  {
    id: 'tidy',
    title: 'Tidy',
    description: '个人工具集。',
    href: 'https://github.com/chess99/tidy',
    tags: ['TOOL'],
  },
  {
    id: 'mp-lens',
    title: 'MP Lens',
    description: '微信小程序分析工具。',
    href: 'https://github.com/chess99/mp-lens',
    tags: ['TOOL', 'WECHAT'],
  },
  {
    id: 'trading-os',
    title: 'Trading OS',
    description: '量化交易系统探索。',
    href: 'https://github.com/chess99/trading-os',
    tags: ['TRADING', 'QUANT'],
  },
]
```

> **注意：** `ArchiveDrawer` 用到的 `ProjectCategory`、`ProjectLinkType`、`featured`、`ordinal` 字段全部删除，因为新设计不再需要 drawer。

- [ ] **Step 2: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: update projects list with tags, remove drawer fields"
```

---

## Task 3：添加社交图标 SVG

**Files:**
- Modify: `src/components/icons.tsx`

- [ ] **Step 1: 读取现有 icons.tsx，在文件末尾追加新图标**

查看现有文件：
```bash
cat src/components/icons.tsx
```

- [ ] **Step 2: 追加即刻、小红书、微信图标**

在 `src/components/icons.tsx` 末尾追加：

```tsx
export function IconJike({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path fill="white" d="M8.5 9.5h7v1.5h-7zM8.5 13h7v1.5h-7z" />
    </svg>
  )
}

export function IconXiaohongshu({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path fill="white" d="M8 8h8v2H8zM8 12h8v2H8zM8 16h5v2H8z" />
    </svg>
  )
}

export function IconWechat({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9.5 4C5.36 4 2 6.69 2 10c0 1.89 1.08 3.57 2.78 4.73L4 17l2.5-1.25c.96.27 1.96.25 2.96.25H9.5C9.18 15.37 9 14.7 9 14c0-3.31 3.13-6 7-6h.5C15.91 5.3 12.93 4 9.5 4zm-1.75 3.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm3.5 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
      <path d="M16 9c-3.31 0-6 2.24-6 5s2.69 5 6 5c.73 0 1.43-.12 2.08-.33L20 20l-.67-2.27C20.6 16.73 22 15.43 22 14c0-2.76-2.69-5-6-5zm-1.5 3.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm3 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
    </svg>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/icons.tsx
git commit -m "feat: add Jike, Xiaohongshu, WeChat social icons"
```

---

## Task 4：重写 App.tsx — 新首页布局

**Files:**
- Modify: `src/App.tsx`
- Delete: `src/components/ArchiveDrawer.tsx`

新布局结构：
```
<Nav>       logo 左，社交图标右
<Hero>      头像 + 名字 + slogan + 简介
<Projects>  网格卡片，每张：(封面占位) 标题 描述 tags
<Footer>    © 年份 | cearl.cc
```

- [ ] **Step 1: 删除 ArchiveDrawer**

```bash
rm src/components/ArchiveDrawer.tsx
```

- [ ] **Step 2: 完整替换 src/App.tsx**

```tsx
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
        <a
          href={profile.social.jike}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="即刻"
          className="rounded-full p-2 transition-all duration-200 ease-ios hover:bg-black/5 hover:text-ink active:scale-95 focus-ring"
        >
          <IconJike className="h-4 w-4" />
        </a>
        <a
          href={profile.social.xiaohongshu}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="小红书"
          className="rounded-full p-2 transition-all duration-200 ease-ios hover:bg-black/5 hover:text-ink active:scale-95 focus-ring"
        >
          <IconXiaohongshu className="h-4 w-4" />
        </a>
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
      {/* Cover placeholder */}
      <div className="h-32 w-full rounded-xl border border-ink/8 bg-gradient-to-br from-ink/6 to-transparent" />
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
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>{profile.domain}</span>
        </div>
      </footer>
    </div>
  )
}
```

- [ ] **Step 3: 本地构建验证无报错**

```bash
npm run build 2>&1 | tail -20
```

Expected: `✓ built in` — 无 TypeScript 错误，无 missing import。

如果报错 `Cannot find module './components/ArchiveDrawer'`，说明有其他文件还 import 了它，grep 找出来删掉即可：
```bash
grep -r "ArchiveDrawer" src/
```

- [ ] **Step 4: 本地预览检查**

```bash
npm run dev
```

打开 `http://localhost:5173`，检查：
- [ ] 头像正常显示
- [ ] Nav 中四个社交图标都渲染
- [ ] Projects 网格正常（3 列 desktop / 2 列 tablet / 1 列 mobile）
- [ ] 入场动画正常
- [ ] 无控制台报错

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git rm src/components/ArchiveDrawer.tsx
git commit -m "feat: redesign homepage with idoubi-style layout — avatar, bio, project grid"
```

---

## Task 5：完善 icons.tsx 中的微信占位逻辑

**Files:**
- Modify: `src/App.tsx`

微信公众号没有标准 profile URL，通常是展示二维码。先用 tooltip 或 hover 弹出占位，等拿到真实信息后再补。

- [ ] **Step 1: 在 Nav 中将 WeChat 图标改为 span 占位（不加链接）**

在 `App.tsx` 的 `Nav` 组件中，将微信图标的 `<a>` 替换为 `<span>`：

```tsx
<span
  title="微信公众号（即将添加）"
  aria-label="微信公众号"
  className="rounded-full p-2 cursor-default text-ink/30"
>
  <IconWechat className="h-4 w-4" />
</span>
```

同理，如果即刻和小红书的 URL 是 `TODO`，也改成 `<span>` 占位，等填入真实链接后改回 `<a>`。

- [ ] **Step 2: Commit**

```bash
git add src/App.tsx
git commit -m "chore: placeholder social icons for wechat/jike/xiaohongshu pending real URLs"
```

---

## Task 6：构建并推送，触发 GitHub Actions 部署

- [ ] **Step 1: 确认 git 状态干净**

```bash
git status
git log --oneline -5
```

- [ ] **Step 2: Push**

```bash
git push origin main
```

- [ ] **Step 3: 确认 GitHub Actions 构建成功**

访问 `https://github.com/chess99/chess99.github.io/actions`，等待 workflow 完成。

- [ ] **Step 4: 线上验证**

打开 `https://cearl.cc`，检查：
- [ ] 头像加载
- [ ] 项目卡片渲染
- [ ] 移动端布局正常（用 DevTools 模拟 375px）
- [ ] 社交图标跳转正确（占位图标不可点击）

---

## 后续待办（计划外，人工完成）

- 补充即刻、小红书真实链接，将 `TODO` 替换为真实 URL，`<span>` 改回 `<a>`
- 补充微信公众号二维码（可做 hover 弹出图片）
- 各项目可选补充真实封面图（放 `public/covers/` 目录，在 `projects.ts` 填 `cover` 字段）
- `profile.ts` 中的 `bio` 可按需调整措辞
