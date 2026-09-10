import Link from "next/link"
import { Button, ButtonLink } from "@/components/ui"
import { ContactCta } from "../components/ContactCta"
import { ContentCard } from "../components/ContentCard"
import { PartnerCard } from "../components/PartnerCard"
import { PublicIcon, type PublicIconName } from "../components/PublicIcon"
import { ResponsiveImage } from "../components/ResponsiveImage"
import { SectionHeading } from "../components/SectionHeading"
import { StoryVideo } from "../components/StoryVideo"
import {
  contentRecords,
  hero,
  innovations,
  kpis,
  partners,
  quickLinks,
  services,
} from "../mocks/public-data"

const landingDistrict = (area: string) => area.split("·")[0].trim()

export function HomePageView() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section
        className="hero-section page-section--surface-sky"
        id="top"
        aria-labelledby="hero-title"
      >
        <div className="site-container hero-layout">
          <div className="hero-layout__copy">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 id="hero-title">{hero.title}</h1>
            <p className="hero-layout__lead">{hero.lead}</p>
            <div className="action-row">
              <ButtonLink
                className="button"
                href="/products"
                icon={<PublicIcon name="arrow-right" />}
              >
                ดูสินค้าและบริการ
              </ButtonLink>
              <ButtonLink className="button button--secondary" href="/register" variant="secondary">
                ลงทะเบียนรับบริการ
              </ButtonLink>
            </div>
          </div>
        </div>
        <ResponsiveImage hero image={hero.image} />
        <div className="site-container hero-assurance-shell">
          <div className="hero-assurance" aria-label="คุณค่าหลักของโครงการ">
            {hero.assurances.map((item) => (
              <div className="assurance-item" key={item.title}>
                <span className="assurance-item__icon">
                  <PublicIcon name={item.icon as PublicIconName} />
                </span>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="page-section discovery-section"
        id="discovery"
        aria-labelledby="discovery-title"
      >
        <div className="site-container">
          <div className="discovery-panel">
            <SectionHeading
              description="เริ่มจากคำที่สนใจ หรือเลือกหมวดหมู่เพื่อดูข้อมูลจำลองที่เกี่ยวข้อง"
              eyebrow="Service discovery"
              id="discovery-title"
              title="ค้นหาบริการที่ใช่สำหรับคุณ"
            />
            <form className="search-form" role="search" action="/products" method="get">
              <label className="search-form__label" htmlFor="landing-service-search">
                ค้นหาบริการ ผลิตภัณฑ์ หรือกิจกรรม
              </label>
              <input
                aria-describedby="discovery-note"
                autoComplete="off"
                id="landing-service-search"
                name="q"
                placeholder="เช่น ตรวจสุขภาพ ฝึกอาชีพ หรือกิจกรรมใกล้บ้าน"
                type="search"
              />
              <Button className="button" icon={<PublicIcon name="search" />} type="submit">
                ค้นหา
              </Button>
            </form>
            <p className="discovery-note" id="discovery-note">
              หน้าแรกแสดงรายการแนะนำ 3 รายการ ส่วนการค้นหาและกรองเต็มรูปแบบอยู่ในหน้าสินค้าและบริการ
            </p>
            <div className="quick-link-grid">
              {quickLinks.map((item) => (
                <Link className="quick-link" href={item.href} key={item.href}>
                  <span className="quick-link__icon">
                    <PublicIcon name={item.icon as PublicIconName} />
                  </span>
                  <span className="quick-link__copy">
                    <strong>{item.title}</strong>
                    <span>
                      {item.description} <PublicIcon name="arrow-right" />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="page-section page-section--surface-sand"
        id="services"
        tabIndex={-1}
        aria-labelledby="services-title"
      >
        <div className="site-container">
          <SectionHeading
            action={{ href: "/products", label: "ดูทั้งหมด" }}
            description="ตัวอย่างบริการจากหลายพื้นที่และผู้ให้บริการ"
            eyebrow="Service discovery"
            id="services-title"
            title="สินค้าและบริการแนะนำ"
          />
          <p className="service-results-status" role="status">
            กำลังแสดงรายการแนะนำ 3 รายการ
          </p>
          <div className="card-grid">
            {services.slice(0, 3).map((item) => (
              <ContentCard
                area={landingDistrict(item.area)}
                description={item.excerpt}
                href={`/products/${encodeURIComponent(item.id)}`}
                image={item.image}
                key={item.id}
                linkLabel="ดูรายละเอียด"
                provider={item.provider}
                supportingIcon="tag"
                supportingText={item.priceLabel}
                tag={item.type}
                title={item.title}
                variant="service"
              />
            ))}
          </div>
          <div className="service-empty" hidden>
            <strong>ไม่พบรายการที่ตรงกับคำค้น</strong>
            <p>ลองค้นหาจากหน้าสินค้าและบริการโดยใช้คำอื่นหรือไม่ระบุคำค้น</p>
          </div>
        </div>
      </section>

      <StoryVideo />

      <CardSection
        action={{ href: "/innovation", label: "ดูนวัตกรรมทั้งหมด" }}
        description="ภูมิปัญญา เทคโนโลยี และแนวทางดูแลที่พัฒนาจากความต้องการจริงของชุมชน"
        eyebrow="Local innovation"
        id="innovations"
        title="นวัตกรรมจากพื้นที่"
      >
        {innovations.slice(0, 3).map((item) => (
          <ContentCard
            area={landingDistrict(item.area)}
            description={item.excerpt}
            image={item.image}
            key={item.id}
            supportingText={item.stage}
            tag={item.category}
            title={item.title}
            variant="innovation"
          />
        ))}
      </CardSection>

      <section className="page-section impact-band" id="impact" aria-labelledby="impact-title">
        <div className="site-container">
          <div className="impact-band__intro">
            <SectionHeading
              description="ข้อมูลรวมจำลอง ไม่มีข้อมูลส่วนบุคคล"
              eyebrow="Public impact"
              id="impact-title"
              title="ผลลัพธ์ที่เกิดขึ้นร่วมกัน"
            />
            <blockquote>
              “เมื่อคน ชุมชน และโอกาสเชื่อมต่อกัน คุณภาพชีวิตที่ดีขึ้นก็เกิดขึ้นได้จริง”
            </blockquote>
          </div>
          <div className="stats-grid">
            {kpis.slice(0, 4).map(([id, label, , value, unit]) => (
              <dl className="stat-card" key={id}>
                <div>
                  <dt>{`${label} · ${unit}`}</dt>
                  <dd>{value.toLocaleString("th-TH")}</dd>
                </div>
              </dl>
            ))}
          </div>
          <div className="impact-meta">
            <span>
              <PublicIcon name="calendar" /> อัปเดตข้อมูลจำลองล่าสุด 31 สิงหาคม 2569
            </span>
            <span>
              <PublicIcon name="shield-check" /> ที่มา: ระบบติดตามผลโครงการและรายงานจากภาคี
            </span>
          </div>
        </div>
      </section>

      <CardSection
        action={{ href: "/knowledge", label: "ดูองค์ความรู้" }}
        eyebrow="Knowledge & news"
        id="knowledge"
        surface="surface-sky"
        title="ความรู้และข่าวสารล่าสุด"
      >
        {contentRecords.slice(0, 3).map((item) => (
          <ContentCard
            area={item.publishDate}
            description={item.excerpt}
            href={`${item.type === "องค์ความรู้" ? "/knowledge" : "/news"}/${encodeURIComponent(item.id)}`}
            image={item.image}
            key={item.id}
            linkLabel="อ่านต่อ"
            tag={item.type}
            title={item.title}
            variant="content"
          />
        ))}
      </CardSection>

      <section
        className="page-section page-section--surface-sky"
        id="partners"
        aria-labelledby="partners-title"
      >
        <div className="site-container">
          <SectionHeading
            action={{ href: "/partners", label: "ดูภาคีทั้งหมด" }}
            eyebrow="Partner network"
            id="partners-title"
            title="ร่วมขับเคลื่อนโดยภาคีในพื้นที่"
          />
          <div className="partner-grid">
            {partners.slice(0, 3).map(([, imageId, name, type, area, summary]) => (
              <PartnerCard
                area={landingDistrict(area)}
                href="/partners"
                id={imageId}
                key={imageId}
                linkLabel="ดูเครือข่าย"
                name={name}
                summary={summary}
                type={type}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        className="page-section contact-section"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="site-container">
          <ContactCta />
        </div>
      </section>
    </main>
  )
}

function CardSection({
  action,
  children,
  description,
  eyebrow,
  id,
  surface,
  title,
}: {
  action?: { href: string; label: string }
  children: React.ReactNode
  description?: string
  eyebrow: string
  id: string
  surface?: string
  title: string
}) {
  return (
    <section
      className={`page-section${surface ? ` page-section--${surface}` : ""}`}
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <div className="site-container">
        <SectionHeading
          action={action}
          description={description}
          eyebrow={eyebrow}
          id={`${id}-title`}
          title={title}
        />
        <div className="card-grid">{children}</div>
      </div>
    </section>
  )
}
