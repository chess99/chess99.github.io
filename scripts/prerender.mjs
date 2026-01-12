import { readFile, writeFile, rm } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dist = join(root, 'dist')
const serverDist = join(root, 'dist-server')
const templatePath = join(dist, 'index.html')

async function prerender() {
  try {
    // 1. 读取构建好的 index.html 模板
    const template = await readFile(templatePath, 'utf8')

    // 2. 加载服务端入口 (SSG Bundle)
    // 注意：需要 import 绝对路径
    const { render } = await import(join(serverDist, 'entry-server.js'))

    // 3. 渲染应用为 HTML 字符串
    const appHtml = render()

    // 4. 将 HTML 注入模板
    // <!--app-html--> 是我们在 index.html 中留下的占位符
    const html = template.replace('<!--app-html-->', appHtml)

    // 5. 写回 index.html
    await writeFile(templatePath, html)
    
    console.log('[prerender] Pre-rendered index.html')

    // 6. 清理服务端构建产物
    await rm(serverDist, { recursive: true, force: true })
    console.log('[prerender] Cleaned up dist-server')

  } catch (e) {
    console.error('[prerender] Error:', e)
    process.exit(1)
  }
}

prerender()
