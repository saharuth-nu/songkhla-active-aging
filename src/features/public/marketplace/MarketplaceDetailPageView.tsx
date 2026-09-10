import { Badge, ButtonLink } from "@/components/ui"
import { PageHero } from "../components/PageHero"
import { PublicIcon } from "../components/PublicIcon"
import { PublicState } from "../components/PublicState"
import { ResponsiveImage } from "../components/ResponsiveImage"
import { services } from "../mocks/public-data"
import { actionFor } from "./marketplace"

export function MarketplaceDetailPageView({ fromHealth, id }: { fromHealth: boolean; id: string }) {
  const item = services.find((record) => record.id === id)
  if (!item) {
    return (
      <PublicState
        backHref="/products"
        backLabel="กลับหน้าสินค้าและบริการ"
        message="ไม่พบรหัสที่ระบุในข้อมูลจำลอง"
        title="ไม่พบสินค้า/บริการ"
      />
    )
  }
  const backHref = fromHealth ? "/health-services" : "/products"
  const backLabel = fromHealth ? "บริการสุขภาพ" : "สินค้าและบริการ"
  const action = actionFor(item)

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "หน้าแรก" },
          { href: backHref, label: backLabel },
          { label: item.title },
        ]}
        description={item.excerpt}
        title={item.title}
      />
      <div className="site-container public-content-shell">
        <article className="public-detail marketplace-detail">
          <div className="public-detail__media">
            <ResponsiveImage image={item.image} />
          </div>
          <div className="public-detail__body">
            <Badge className="badge" variant="service">
              {item.type}
            </Badge>
            <p className="marketplace-detail__price">{item.priceLabel}</p>
            <p className="public-lead">{item.description}</p>
            <dl className="fact-grid">
              <div>
                <dt>ผู้ให้บริการ</dt>
                <dd>{item.provider}</dd>
              </div>
              <div>
                <dt>พื้นที่</dt>
                <dd>{item.area}</dd>
              </div>
              <div>
                <dt>เหมาะสำหรับ</dt>
                <dd>{item.eligibility}</dd>
              </div>
              <div>
                <dt>ช่วงเวลา</dt>
                <dd>{item.schedule}</dd>
              </div>
            </dl>
            <div className="action-row">
              <ButtonLink
                className="button button--secondary"
                href={action.href}
                icon={<PublicIcon name="arrow-right" />}
              >
                {action.label}
              </ButtonLink>
              <ButtonLink
                className="button"
                href={`/contact?subject=${encodeURIComponent(`ติดต่อผ่านโครงการ: ${item.title}`)}`}
                variant="secondary"
              >
                ติดต่อผ่านโครงการ
              </ButtonLink>
            </div>
            <p className="mock-disclaimer">
              คำขอและการชำระเงินเป็นข้อมูลจำลอง ไม่มีการรับเงินจริงหรือส่งข้อมูลออกจากเครื่อง
            </p>
          </div>
        </article>
      </div>
    </main>
  )
}
