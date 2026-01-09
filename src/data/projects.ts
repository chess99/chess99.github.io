export type ProjectCategory =
  | 'Tool'
  | 'Web App'
  | 'Design'
  | 'Library'
  | 'Note'
  | 'Other'

export type ProjectLinkType = 'external' | 'internal'

export interface Project {
  id: string
  title: string
  description: string
  category: ProjectCategory
  href: string
  linkType?: ProjectLinkType
  featured?: boolean
  /** Optional small label shown in featured list, e.g. "01." */
  ordinal?: string
}

export const projects: Project[] = [
  {
    id: 'blog',
    title: 'Blog',
    description: 'Notes, essays, and technical write-ups.',
    category: 'Note',
    href: '/blog/',
    linkType: 'internal',
    featured: true,
    ordinal: '01.',
  },
  {
    id: 'github',
    title: 'GitHub',
    description: 'Projects, experiments, and code.',
    category: 'Other',
    href: 'https://github.com/chess99',
    linkType: 'external',
    featured: true,
    ordinal: '02.',
  },
  {
    id: 'minimal-notes',
    title: 'Minimal Notes',
    description: 'A small web app for focused writing.',
    category: 'Web App',
    href: 'https://example.com',
    linkType: 'external',
    featured: true,
    ordinal: '03.',
  },
  {
    id: 'css-experiments',
    title: 'CSS Experiments',
    description: 'Typography & layout studies.',
    category: 'Design',
    href: 'https://example.com',
    linkType: 'external',
    featured: true,
    ordinal: '04.',
  },
  // Archive-only samples
  {
    id: 'project-nebula',
    title: 'Project Nebula',
    description: 'A clean admin template and data dashboard starter.',
    category: 'Tool',
    href: 'https://example.com',
    linkType: 'external',
  },
  {
    id: 'library-something',
    title: 'Small Library',
    description: 'Tiny utilities with strict types and tests.',
    category: 'Library',
    href: 'https://example.com',
    linkType: 'external',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const archiveProjects = projects.filter((p) => !p.featured)
