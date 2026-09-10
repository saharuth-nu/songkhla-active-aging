import Link from "next/link"
import { PublicIcon } from "./PublicIcon"

export function SectionHeading({
  action,
  description,
  eyebrow,
  id,
  title,
}: {
  action?: { href: string; label: string }
  description?: string
  eyebrow?: string
  id: string
  title: string
}) {
  return (
    <div className="section-heading">
      <div className="section-heading__copy">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 id={id}>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? (
        <Link className="section-link" href={action.href}>
          <span>{action.label}</span>
          <PublicIcon name="arrow-right" />
        </Link>
      ) : null}
    </div>
  )
}
