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
    id: 'trading-os',
    title: 'Trading OS',
    description: 'A 股 AI 辅助研究工作台，Claude Code Skill 驱动的三套独立分析体系。',
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
