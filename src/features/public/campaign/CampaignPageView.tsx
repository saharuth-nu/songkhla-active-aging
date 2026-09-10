import Link from "next/link"
import { ButtonLink } from "@/components/ui"
import { CatalogCard } from "../components/CatalogCard"
import { PublicIcon } from "../components/PublicIcon"
import { services } from "../mocks/public-data"

const highlights = [
  ["heart-pulse", "ดูแลสุขภาพใกล้บ้าน", "ค้นหากิจกรรมและบริการสุขภาพจากเครือข่ายในพื้นที่"],
  ["users", "ครอบครัวเริ่มแทนได้", "ผู้ดูแลสามารถค้นหาข้อมูลและส่งคำขอเพื่อให้ทีมงานประสานกลับ"],
  [
    "shield-check",
    "ขั้นตอนไม่ซับซ้อน",
    "เลือกบริการ กรอกข้อมูลที่จำเป็น และเก็บรหัสไว้ติดตามสถานะ",
  ],
] as const

export function CampaignPageView() {
  const featured = services.filter((item) => ["SRV-001", "SRV-004", "SRV-005"].includes(item.id))
  const tracking = "source=Facebook&utm_source=Facebook&utm_campaign=active-aging-2569"
  return (
    <main className="campaign-page" id="main-content">
      <section aria-labelledby="campaign-title" className="campaign-landing-hero">
        <div className="site-container campaign-landing-hero__inner">
          <div className="campaign-landing-hero__copy">
            <p className="eyebrow eyebrow--on-dark">ก้าวไปด้วยกัน 2569</p>
            <h1 id="campaign-title">เริ่มต้นสุขภาวะดีจากบริการใกล้บ้าน</h1>
            <p>ค้นหาบริการและกิจกรรมที่เหมาะกับคุณ</p>
            <div className="action-row">
              <ButtonLink
                className="button button--on-dark"
                href="#campaign-services"
                icon={<PublicIcon name="arrow-right" />}
              >
                ดูบริการที่แนะนำ
              </ButtonLink>
              <ButtonLink
                className="button button--campaign-secondary"
                href={`/register?${tracking}`}
                variant="secondary"
              >
                ลงทะเบียนรับบริการ
              </ButtonLink>
            </div>
            <small>เข้าถึงได้จาก Facebook / QR / Event</small>
          </div>
          <div
            aria-label="ยังไม่มีรูปภาพหลักของแคมเปญ"
            className="campaign-landing-hero__visual"
            data-image-id="CMP-HERO-01"
            role="img"
          >
            <strong>ยังไม่มีรูปภาพ</strong>
            <small>จะเพิ่มรูปภาพในภายหลัง</small>
          </div>
        </div>
      </section>
      <section
        aria-labelledby="campaign-highlights-title"
        className="campaign-section campaign-section--highlights"
      >
        <div className="site-container">
          <div className="campaign-section__heading">
            <p className="eyebrow">เริ่มจากสิ่งที่สำคัญกับคุณ</p>
            <h2 id="campaign-highlights-title">บริการและการประสานที่เข้าใจง่าย</h2>
          </div>
          <div className="campaign-highlight-grid">
            {highlights.map(([icon, title, description]) => (
              <article className="campaign-highlight" key={title}>
                <span>
                  <PublicIcon name={icon} />
                </span>
                <h2>{title}</h2>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        aria-labelledby="campaign-services-title"
        className="campaign-section campaign-section--services"
        id="campaign-services"
        tabIndex={-1}
      >
        <div className="site-container">
          <div className="campaign-section__heading">
            <p className="eyebrow">บริการจากเครือข่ายในพื้นที่</p>
            <h2 id="campaign-services-title">บริการที่แนะนำจากแคมเปญ</h2>
            <p>เลือกดูรายละเอียด ขอรับบริการ หรือสอบถามทีมโครงการตามประเภทของแต่ละรายการ</p>
          </div>
          <div className="catalog-grid campaign-service-grid">
            {featured.map((item) => {
              const contact = item.action === "contact"
              const actionHref = contact
                ? `/contact?subject=${encodeURIComponent(`สอบถามบริการ: ${item.title}`)}`
                : `/request/start?item=${item.id}&intent=${item.action}&${tracking}`
              return (
                <CatalogCard
                  actionHref={actionHref}
                  actionLabel={
                    contact ? "สอบถามบริการ" : item.action === "order" ? "สั่งซื้อ" : "ขอรับบริการ"
                  }
                  detailHref={`/products/${item.id}?from=campaign&campaignPage=active-aging&${tracking}`}
                  item={item}
                  key={item.id}
                />
              )
            })}
          </div>
          <div className="campaign-section__action">
            <ButtonLink
              className="button button--secondary"
              href="/products"
              icon={<PublicIcon name="arrow-right" />}
              variant="secondary"
            >
              ดูสินค้าและบริการทั้งหมด
            </ButtonLink>
          </div>
        </div>
      </section>
      <section
        aria-labelledby="campaign-steps-title"
        className="campaign-section campaign-section--steps"
      >
        <div className="site-container campaign-steps-layout">
          <div>
            <p className="eyebrow">เริ่มต้นได้ใน 3 ขั้นตอน</p>
            <h2 id="campaign-steps-title">จากความสนใจสู่การประสานบริการ</h2>
            <p>ทุกขั้นตอนในต้นแบบใช้ข้อมูลจำลอง และไม่มีการชำระเงินจริง</p>
            <aside className="tracking-note">
              <strong>Campaign Tracking Summary</strong>
              <span>Source: facebook</span>
              <span>Medium: social</span>
              <span>Campaign: active-aging-2569</span>
              <span>Content: —</span>
              <span>Term: —</span>
            </aside>
          </div>
          <ol>
            {[
              "เลือกบริการที่ตรงกับความต้องการ",
              "กรอกคำขอหรือสอบถามทีมโครงการ",
              "ใช้รหัสคำขอติดตามความคืบหน้า",
            ].map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="campaign-section">
        <div className="site-container">
          <div className="campaign-final-cta">
            <div>
              <p className="eyebrow eyebrow--on-dark">Songkhla Active</p>
              <h2>ยังไม่แน่ใจว่าควรเลือกบริการใด?</h2>
              <p>
                ลงทะเบียนความสนใจ หรือติดต่อทีมโครงการเพื่อช่วยแนะนำบริการที่เหมาะกับพื้นที่ของคุณ
              </p>
            </div>
            <div className="action-row">
              <ButtonLink
                className="button button--on-dark"
                href={`/register?${tracking}`}
                icon={<PublicIcon name="arrow-right" />}
              >
                ลงทะเบียนรับบริการ
              </ButtonLink>
              <Link
                className="button button--campaign-secondary"
                href="/contact?subject=ขอคำแนะนำจากแคมเปญ%20ก้าวไปด้วยกัน%202569"
              >
                ติดต่อโครงการ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export function CampaignNotFoundView() {
  return (
    <main className="campaign-page" id="main-content">
      <section className="campaign-state site-container">
        <span aria-hidden="true">?</span>
        <h1>ไม่พบแคมเปญที่ต้องการ</h1>
        <p>แคมเปญนี้ไม่มีอยู่ในข้อมูลจำลอง หรืออาจสิ้นสุดเส้นทางทดสอบแล้ว</p>
        <ButtonLink className="button" href="/" icon={<PublicIcon name="arrow-right" />}>
          กลับหน้าแรก
        </ButtonLink>
      </section>
    </main>
  )
}
