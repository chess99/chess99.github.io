import { projects } from '../data/projects'

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px w-6 bg-ink/40" />
      <h2 className="text-[15px] font-medium text-ink/80 tracking-wide">{title}</h2>
    </div>
  )
}

function ProductCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl border border-ink/10 bg-white/50 overflow-hidden hover:border-ink/20 hover:shadow-sm transition-all duration-200 active:scale-[0.98]"
    >
      <div className="h-36 w-full bg-gradient-to-br from-ink/[0.06] to-ink/[0.02] border-b border-ink/8 overflow-hidden">
        {project.cover ? (
          <img src={project.cover} alt={project.title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full" />
        )}
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-[14px] font-semibold text-ink leading-tight group-hover:text-ink/90">
          {project.title}
        </h3>
        <p className="text-[12px] text-ink/55 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm bg-ink/[0.06] px-1.5 py-0.5 text-[10px] font-medium tracking-wider text-ink/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}

export default function ProductsPage() {
  return (
    <main className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <SectionHeading title="全部产品" />
        <a
          href="/"
          className="flex items-center gap-1 text-[13px] text-ink/50 hover:text-ink transition-colors"
        >
          ← 返回
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((p) => (
          <ProductCard key={p.id} project={p} />
        ))}
      </div>
    </main>
  )
}
