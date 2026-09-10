import { ButtonLink } from "@/components/ui"
import { PageHero } from "../components/PageHero"
import { PublicIcon, type PublicIconName } from "../components/PublicIcon"
import { ResponsiveImage } from "../components/ResponsiveImage"
import { SectionHeading } from "../components/SectionHeading"
import { about } from "../mocks/public-data"

export function AboutPageView() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero description={about.description} image={about.heroImage} title={about.title} />
      <div className="site-container public-content-shell">
        <section className="public-feature-split" aria-labelledby="about-overview-title">
          <ResponsiveImage image={about.overviewImage} />
          <div>
            <p className="eyebrow">ภาพรวมโครงการ</p>
            <h2 id="about-overview-title">{about.statementTitle}</h2>
            <p className="public-lead">{about.statement}</p>
            <p>{about.statementDetail}</p>
          </div>
        </section>

        <section className="public-page-section" aria-labelledby="about-values-title">
          <SectionHeading
            eyebrow="วัตถุประสงค์"
            id="about-values-title"
            title="สิ่งที่โครงการมุ่งสร้าง"
          />
          <div className="value-grid">
            {about.values.map(([icon, title, description]) => (
              <article className="value-card" key={title}>
                <span className="value-card__icon">
                  <PublicIcon name={icon as PublicIconName} />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="public-page-section public-page-section--soft"
          aria-labelledby="about-audience-title"
        >
          <SectionHeading
            eyebrow="กลุ่มเป้าหมาย"
            id="about-audience-title"
            title="โครงการนี้มีไว้เพื่อใคร"
          />
          <div className="value-grid">
            {about.audiences.map(([title, description]) => (
              <article className="value-card" key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="public-page-section" aria-labelledby="about-approach-title">
          <SectionHeading
            eyebrow="แนวทางดำเนินงาน"
            id="about-approach-title"
            title="เชื่อมคน บริการ และโอกาสในพื้นที่"
          />
          <ol className="system-list">
            {about.approach.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </li>
            ))}
          </ol>
        </section>

        <section className="public-cta">
          <div>
            <h2>เริ่มสำรวจบริการในพื้นที่</h2>
            <p>ค้นหาตามประเภทและอำเภอจากข้อมูลจำลอง</p>
          </div>
          <ButtonLink
            className="button button--on-dark"
            href="/products"
            icon={<PublicIcon name="arrow-right" />}
            onDark
          >
            ดูสินค้าและบริการ
          </ButtonLink>
        </section>
      </div>
    </main>
  )
}
