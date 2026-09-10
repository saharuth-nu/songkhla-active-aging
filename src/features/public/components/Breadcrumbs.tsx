import Link from "next/link"

export type BreadcrumbItem = { href?: string; label: string }

export function Breadcrumbs({ items }: { items: ReadonlyArray<BreadcrumbItem> }) {
  return (
    <nav className="breadcrumbs" aria-label="เส้นทางหน้า">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {index === items.length - 1 || !item.href ? (
              <span aria-current="page">{item.label}</span>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
