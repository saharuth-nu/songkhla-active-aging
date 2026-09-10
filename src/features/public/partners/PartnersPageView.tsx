import { ButtonLink } from "@/components/ui"
import { PageHero } from "../components/PageHero"
import { PartnerCard } from "../components/PartnerCard"
import { PublicIcon } from "../components/PublicIcon"
import { partners } from "../mocks/public-data"

export function PartnersPageView() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        description="ภาคีส่งข้อมูลผ่านผู้ดูแลโครงการ โดยไม่มีบัญชีสำหรับภาคีแยกต่างหาก"
        title="ภาคีเครือข่าย"
      />
      <div className="site-container public-content-shell">
        <div className="partner-grid public-partner-grid">
          {partners.map(([id, imageId, name, type, area, summary]) => (
            <PartnerCard
              area={area}
              href={`/contact?partner=${encodeURIComponent(id)}`}
              id={imageId}
              key={id}
              name={name}
              summary={summary}
              type={type}
            />
          ))}
        </div>
        <section className="public-cta">
          <div>
            <p className="eyebrow eyebrow--on-dark">Partner contribution</p>
            <h2>ต้องการเสนอข้อมูลจากภาคี?</h2>
            <p>ทีมโครงการจะช่วยบันทึกและตรวจสอบข้อมูลก่อนเผยแพร่</p>
          </div>
          <ButtonLink
            className="button button--on-dark"
            href="/contact?subject=%E0%B9%80%E0%B8%AA%E0%B8%99%E0%B8%AD%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%B9%E0%B8%A5%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%84%E0%B8%B5"
            icon={<PublicIcon name="arrow-right" />}
            onDark
          >
            ติดต่อโครงการ
          </ButtonLink>
        </section>
      </div>
    </main>
  )
}
