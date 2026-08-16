import Link from 'next/link'

export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[]
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[#6B5A5A]">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/admin" className="hover:text-[#8B1A1A]">
            Admin
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            <span aria-hidden>/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-[#8B1A1A]">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-[#1A0A0A]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string
  description?: string
  actions?: React.ReactNode
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-black text-[#1A0A0A]">{title}</h1>
        {description && <p className="mt-1 text-sm text-[#6B5A5A]">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}
