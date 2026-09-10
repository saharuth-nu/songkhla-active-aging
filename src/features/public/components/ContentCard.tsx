import Link from "next/link"
import { Badge } from "@/components/ui"
import type { PublicImage } from "../mocks/public-data"
import { PublicIcon, type PublicIconName } from "./PublicIcon"
import { ResponsiveImage } from "./ResponsiveImage"

export type ContentCardProps = {
  area?: string
  description: string
  href?: string
  image: PublicImage
  linkLabel?: string
  provider?: string
  supportingIcon?: PublicIconName
  supportingText?: string
  tag: string
  title: string
  variant: "service" | "innovation" | "content"
}

export function ContentCard({
  area,
  description,
  href,
  image,
  linkLabel = "ดูรายละเอียด",
  provider,
  supportingIcon = "shield-check",
  supportingText,
  tag,
  title,
  variant,
}: ContentCardProps) {
  return (
    <article className={`layout-card layout-card--${variant}`}>
      <ResponsiveImage image={image} />
      <div className="layout-card__body">
        <div className="layout-card__meta">
          <Badge className="badge" variant={variant}>
            {tag}
          </Badge>
          {area ? <span>{area}</span> : null}
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
        {provider || supportingText ? (
          <div className="layout-card__details">
            {provider ? (
              <span>
                <PublicIcon name="users" /> {provider}
              </span>
            ) : null}
            {supportingText ? (
              <span>
                <PublicIcon name={supportingIcon} /> {supportingText}
              </span>
            ) : null}
          </div>
        ) : null}
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
