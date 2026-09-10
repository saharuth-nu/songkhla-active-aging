import Link from "next/link"
import { PublicIcon } from "./PublicIcon"

export function PartnerCard({
  area,
  href,
  id,
  linkLabel = "ติดต่อผ่านโครงการ",
  name,
  summary,
  type,
}: {
  area: string
  href?: string
  id: string
  linkLabel?: string
  name: string
  summary: string
  type: string
}) {
  return (
    <article className="partner-card">
      <div
        className="partner-placeholder"
        data-image-id={id}
        role="img"
        aria-label={`ยังไม่มีโลโก้ของ ${name}`}
      >
        <strong>ยังไม่มีโลโก้</strong>
        <span>จะเพิ่มโลโก้ในภายหลัง</span>
      </div>
      <div className="partner-card__body">
        <p className="layout-card__meta">
          <span>{type}</span>
          <span>{area}</span>
        </p>
        <h3>{name}</h3>
        <p>{summary}</p>
        {href ? (
          <Link className="card-link" href={href}>
            <span>{linkLabel}</span>
            <PublicIcon name="arrow-right" />
          </Link>
        ) : null}
      </div>
    </article>
  )
}
