export interface Project {
  id: string
  title: string
  description: string
  href: string
  tags: string[]
  cover?: string
}

export const projects: Project[] = [
  {
    id: 'ai-reading',
    title: '晨笙阅读',
    description: 'AI 驱动的书籍解读与知识分享平台，全文搜索，标签浏览。',
    href: 'https://read.cearl.cc/',
    tags: ['AI', 'READING'],
    cover: '/covers/ai-reading.png',
  },
  {
    id: 'markgleam',
    title: 'MarkGleam',
    description: '浏览器本地运行的内容视觉工作台，支持 Markdown、代码、公式和图表，导出图片与 PDF。',
    href: 'https://markgleam.com/',
    tags: ['TOOL', 'MARKDOWN'],
    cover: '/covers/markgleam.jpg',
  },
  {
    id: 'trading-os',
    title: 'Trading OS',
    description: '覆盖 A 股、港股与美股的投资研究工作台，汇集公司、行业和宏观研究。',
    href: 'https://github.com/chess99/trading-os',
    tags: ['TRADING', 'AI'],
    cover: '/covers/trading-os.png',
  },
  {
    id: 'tidy',
    title: 'Tidy',
    description: '本地照片 / 视频整理与去重工具，以内容哈希为主键，可恢复一致性落盘。',
    href: 'https://github.com/chess99/tidy',
    tags: ['TOOL'],
    cover: '/covers/tidy.jpg',
  },
  {
    id: 'mp-lens',
    title: 'MP Lens',
    description: '微信小程序依赖分析与代码清理 CLI，一键发现并安全删除未使用文件。',
    href: 'https://github.com/chess99/mp-lens',
    tags: ['TOOL', 'WECHAT'],
    cover: '/covers/mp-lens.jpg',
  },
  {
    id: 'mp-component-navigator',
    title: 'MP Component Navigator',
    description: 'VS Code 扩展，在小程序项目中快速跳转到组件定义，零配置开箱即用。',
    href: 'https://marketplace.visualstudio.com/items?itemName=mp-kit.mp-component-jumper',
    tags: ['TOOL', 'VSCODE', 'WECHAT'],
    cover: '/covers/mp-component-navigator.png',
  },
]
