import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const dist = join(root, 'dist')

async function copyTextFile(srcName, destName = srcName) {
  const src = join(root, srcName)
  const dest = join(dist, destName)
  const content = await readFile(src, 'utf8')
  await mkdir(dirname(dest), { recursive: true })
  await writeFile(dest, content)
}

await copyTextFile('CNAME')
await copyTextFile('robots.txt')
await copyTextFile('404.html')
// Ensure GitHub Pages doesn't run Jekyll processing.
await writeFile(join(dist, '.nojekyll'), '')

console.log('[postbuild] copied CNAME/robots.txt/404.html and wrote .nojekyll')
