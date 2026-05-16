# SEO & Performance Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为 cearl.cc 补全 SEO 基础设施（sitemap、robots、meta tags、JSON-LD、llms.txt），优化字体加载性能，并通过 postbuild 脚本确保所有文件随构建自动输出到 dist。

**Architecture:** 所有 SEO 文件（sitemap.xml、llms.txt）以静态文件形式放在 `public/` 目录，随 Vite 构建自动复制；robots.txt 已存在但需补全；index.html 补充 meta/OG/JSON-LD；postbuild.mjs 补充对 sitemap.xml 和 llms.txt 的复制。字体改为异步加载消除渲染阻塞。

**Tech Stack:** Vite + React SSR prerender，GitHub Pages（cearl.cc），Node.js build scripts

---

## 文件变更清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `public/sitemap.xml` | 新建 | 静态 sitemap，仅首页 |
| `public/llms.txt` | 新建 | AI 搜索引擎指南 |
| `robots.txt` | 修改 | 补充 Sitemap 行 + AI bot 规则 |
| `index.html` | 修改 | 补充 OG/Twitter/canonical/JSON-LD，字体改异步 |
| `scripts/postbuild.mjs` | 修改 | 补充复制 sitemap.xml 和 llms.txt |
| `src/data/projects.ts` | 修改 | 修正 ai-reading 链接为 https://reading.cearl.cc/ |

---

## Task 1: 修正 ai-reading 链接

**Files:**
- Modify: `src/data/projects.ts`

- [ ] **Step 1: 更新链接**

编辑 `src/data/projects.ts`，将：
```ts
    href: 'https://cearl.cc/ai-reading/',
```
改为：
```ts
    href: 'https://reading.cearl.cc/',
```

- [ ] **Step 2: 验证**

```bash
grep "ai-reading\|reading.cearl" src/data/projects.ts
```
Expected: 只剩 `https://reading.cearl.cc/`

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "fix: update ai-reading link to reading.cearl.cc"
```

---

## Task 2: 补全 robots.txt

参考 news-intel 的 robots.txt 格式，补充 AI bot 规则和 Sitemap 指向。

**Files:**
- Modify: `robots.txt`

- [ ] **Step 1: 替换 robots.txt 内容**

```
User-agent: *
Allow: /

# AI search bots — allow citation and indexing
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: https://cearl.cc/sitemap.xml
```

- [ ] **Step 2: Commit**

```bash
git add robots.txt
git commit -m "feat: update robots.txt with AI bots and sitemap URL"
```

---

## Task 3: 创建 sitemap.xml

cearl.cc 是单页个人索引站，只有一个页面，生成静态 sitemap 即可。

**Files:**
- Create: `public/sitemap.xml`

- [ ] **Step 1: 创建文件**

新建 `public/sitemap.xml`：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://cearl.cc/</loc>
    <lastmod>2026-05-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 2: 验证文件存在**

```bash
cat public/sitemap.xml
```

Expected: 输出上述 XML 内容。

- [ ] **Step 3: 更新 postbuild.mjs，让构建时自动复制**

编辑 `scripts/postbuild.mjs`，在 `copyTextFile('robots.txt')` 之后添加：

```js
await copyTextFile('public/sitemap.xml', 'sitemap.xml')
await copyTextFile('public/llms.txt', 'llms.txt')
```

注意：`public/` 目录下的文件 Vite 构建时会自动复制到 `dist/`，所以也可以不在 postbuild 里处理。验证方式见 Task 6。

实际上 Vite 对 `public/` 的处理已经自动复制，**postbuild.mjs 不需要修改**。只需确认 vite build 后 dist/ 里有这两个文件即可（Task 6 验证）。

- [ ] **Step 4: Commit**

```bash
git add public/sitemap.xml
git commit -m "feat: add sitemap.xml"
```

---

## Task 4: 创建 llms.txt

**Files:**
- Create: `public/llms.txt`

- [ ] **Step 1: 创建文件**

新建 `public/llms.txt`：

```
# Cearl (cearl.cc)

> 软件工程师，专注 AI 编程与工程效能。个人主页索引站。

## 关于

- 作者：晨笙（Cearl）
- 域名：cearl.cc
- 定位：个人索引站，汇聚博客、产品、社交账号入口

## 内容

- 博客：https://blog.cearl.cc — AI 编程、软件工程、技术思考
- AI Reading：https://reading.cearl.cc — AI 驱动的书籍解读与知识分享平台
- News Intel：https://news.cearl.cc — 每日 AI 与科技深度资讯，30+ 信源 LLM 批判性分析
- GitHub：https://github.com/chess99

## 项目

- Tidy：本地照片/视频整理与去重工具 — https://github.com/chess99/tidy
- MP Lens：微信小程序依赖分析与清理 CLI — https://github.com/chess99/mp-lens
- MP Component Navigator：VSCode 小程序组件跳转扩展 — https://marketplace.visualstudio.com/items?itemName=mp-kit.mp-component-jumper
- Trading OS：A 股 AI 辅助研究工作台 — https://github.com/chess99/trading-os

## 联系

- 即刻：https://web.okjike.com/u/769fe2df-5ba4-4618-a486-3a72efac98ba
- 小红书：https://www.xiaohongshu.com/user/profile/5bfced986b58b74f560b2e23
```

- [ ] **Step 2: Commit**

```bash
git add public/llms.txt
git commit -m "feat: add llms.txt for AI search engines"
```

---

## Task 5: 补全 index.html meta 标签 + 字体异步加载

**Files:**
- Modify: `index.html`

- [ ] **Step 1: 替换 index.html 的 `<head>` 内容**

将 `index.html` 的 `<head>` 替换为：

```html
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cearl — AI 编程与工程效能</title>
    <meta name="description" content="晨笙（Cearl）的个人主页，软件工程师，专注 AI 编程与工程效能。博客、产品与开源项目入口。" />
    <link rel="canonical" href="https://cearl.cc/" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://cearl.cc/" />
    <meta property="og:title" content="Cearl — AI 编程与工程效能" />
    <meta property="og:description" content="晨笙（Cearl）的个人主页，软件工程师，专注 AI 编程与工程效能。博客、产品与开源项目入口。" />
    <meta property="og:locale" content="zh_CN" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Cearl — AI 编程与工程效能" />
    <meta name="twitter:description" content="晨笙（Cearl）的个人主页，软件工程师，专注 AI 编程与工程效能。" />

    <!-- JSON-LD structured data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "晨笙",
      "alternateName": "Cearl",
      "url": "https://cearl.cc",
      "description": "软件工程师，专注 AI 编程与工程效能",
      "sameAs": [
        "https://github.com/chess99",
        "https://web.okjike.com/u/769fe2df-5ba4-4618-a486-3a72efac98ba",
        "https://www.xiaohongshu.com/user/profile/5bfced986b58b74f560b2e23"
      ]
    }
    </script>

    <!-- Fonts: async load to avoid render blocking -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preload"
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@400;500;600&display=swap"
      as="style"
      onload="this.onload=null;this.rel='stylesheet'" />
    <noscript>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
    </noscript>
  </head>
```

- [ ] **Step 2: 验证 HTML 结构**

```bash
grep -E "og:|twitter:|ld\+json|canonical|preload" index.html | head -20
```

Expected: 能看到 og:type、twitter:card、ld+json、canonical、preload 各一行。

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add OG tags, JSON-LD, canonical, async font loading"
```

---

## Task 6: 验证构建输出

确认 Vite 构建后 dist/ 包含所有 SEO 文件。

**Files:**（无需修改，纯验证）

- [ ] **Step 1: 执行构建**

```bash
npm run build
```

Expected: 构建成功，无报错。

- [ ] **Step 2: 检查 dist/ 输出**

```bash
ls dist/sitemap.xml dist/llms.txt dist/robots.txt
```

Expected: 三个文件都存在。

```bash
head -5 dist/sitemap.xml
```

Expected: 输出 `<?xml version="1.0"...`

```bash
curl -s dist/index.html | grep -E "og:type|ld\+json|canonical" | head -5
```

Expected: 能看到 JSON-LD 和 og:type。

- [ ] **Step 3: 如果 sitemap.xml 或 llms.txt 不在 dist/ 里**

Vite 会自动将 `public/` 内容复制到 `dist/`，正常情况下不需要额外处理。若不存在，在 `scripts/postbuild.mjs` 中追加：

```js
await copyTextFile('public/sitemap.xml', 'sitemap.xml')
await copyTextFile('public/llms.txt', 'llms.txt')
```

重新运行 `npm run build` 并确认。

---

## Task 7: 线上验证（部署后）

Push 到 main 后，等 GitHub Actions 部署完成（约 1-2 分钟），执行以下验证：

- [ ] **Step 1: 检查文件可访问性和 Content-Type**

```bash
curl -sI https://cearl.cc/robots.txt | grep -E "HTTP|content-type"
curl -sI https://cearl.cc/sitemap.xml | grep -E "HTTP|content-type"
curl -sI https://cearl.cc/llms.txt | grep -E "HTTP|content-type"
```

Expected:
- robots.txt: `HTTP/2 200` + `content-type: text/plain`
- sitemap.xml: `HTTP/2 200` + `content-type: application/xml` 或 `text/xml`
- llms.txt: `HTTP/2 200` + `content-type: text/plain`

- [ ] **Step 2: 运行 PageSpeed Insights**

```bash
curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://cearl.cc/&strategy=mobile" | python3 -m json.tool | grep -E '"score"|"displayValue"' | head -20
```

记录 LCP、CLS、INP 基准值，供后续优化对比。

- [ ] **Step 3: 提交 Google Search Console（若未提交）**

按照 `webmaster-skills:search-console` 流程：
1. 访问 https://search.google.com/search-console/
2. 添加属性 `https://cearl.cc`（URL prefix）
3. 下载 HTML 验证文件，放入 `public/` 目录，走一次构建+部署
4. 在 Search Console 中点 Verify
5. Sitemaps → 提交 `sitemap.xml`

- [ ] **Step 4: Baidu 主动推送**

（需要 Baidu 站点验证 token，仓库内已有 `baidu_verify_codeva-*.html`，说明站点已验证）

```bash
curl -s https://cearl.cc/sitemap.xml | grep -oP '(?<=<loc>)[^<]+' > /tmp/baidu-urls.txt
cat /tmp/baidu-urls.txt

curl -s -H 'Content-Type:text/plain' \
  --data-binary @/tmp/baidu-urls.txt \
  "https://data.zz.baidu.com/urls?site=https://cearl.cc&token=YOUR_TOKEN"
```

token 从 https://ziyuan.baidu.com/linksubmit/index 获取。

---

## 优先级说明

| Task | 影响 | 耗时 |
|------|------|------|
| Task 1: 修正链接 | 中（避免死链） | 1 min |
| Task 2: robots.txt | 高（AI 搜索引擎爬取） | 2 min |
| Task 3: sitemap.xml | 高（搜索引擎发现页面） | 3 min |
| Task 4: llms.txt | 中（AI 搜索引擎 citation） | 3 min |
| Task 5: meta + JSON-LD + 字体 | 高（社交分享+结构化数据+LCP） | 5 min |
| Task 6: 构建验证 | 必要（确保文件输出） | 2 min |
| Task 7: 线上验证+提交 | 最终目标 | 10 min |
