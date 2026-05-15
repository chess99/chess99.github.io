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
