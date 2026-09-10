import Link from "next/link"
import { Badge, ButtonLink } from "@/components/ui"
import type { Service } from "../mocks/public-data"
import { PublicIcon } from "./PublicIcon"
import { ResponsiveImage } from "./ResponsiveImage"

export function CatalogCard({
  actionHref,
  actionLabel,
  detailHref,
  item,
}: {
  actionHref: string
  actionLabel: string
  detailHref: string
  item: Service
}) {
  return (
    <article className="catalog-card" data-service-id={item.id}>
      <div className="catalog-card__media">
        <ResponsiveImage image={item.image} />
        <Badge className="badge" variant="service">
          {item.type}
        </Badge>
      </div>
      <div className="catalog-card__body">
        <h2>
          <Link href={detailHref}>{item.title}</Link>
        </h2>
        <p className="catalog-card__summary">{item.excerpt}</p>
        <div className="catalog-card__details">
          <span>
            <PublicIcon name="users" />
            <span>
              <strong>ผู้ให้บริการ</strong> · {item.provider}
            </span>
          </span>
          <span>
            <PublicIcon name="map-pin" />
            <span>
              <strong>พื้นที่</strong> · {item.area}
            </span>
          </span>
        </div>
        <Link className="catalog-card__detail" href={detailHref}>
          ดูรายละเอียด <PublicIcon name="arrow-right" />
        </Link>
        <div className="catalog-card__footer">
          <strong>{item.priceLabel}</strong>
          <ButtonLink className="button" href={actionHref}>
            {actionLabel}
          </ButtonLink>
        </div>
      </div>
    </article>
  )
}
