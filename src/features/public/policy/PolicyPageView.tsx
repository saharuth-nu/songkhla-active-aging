import { ButtonLink } from "@/components/ui"
import { PageHero } from "../components/PageHero"

export type PolicyKind = "privacy" | "terms" | "accessibility"

const policies = {
  privacy: {
    title: "ประกาศความเป็นส่วนตัว",
    lead: "ต้นแบบนี้ใช้ข้อมูลจำลองและบันทึกไว้ในเบราว์เซอร์ของผู้ทดสอบเท่านั้น ไม่มีการส่งข้อมูลไปยังระบบภายนอก",
    items: [
      "ข้อมูลที่กรอกใช้เพื่อจำลองการประสานบริการและสรุปผลระดับ Aggregate",
      "ข้อมูลติดต่อใช้เฉพาะในสถานการณ์จำลองที่ผู้ใช้ขอให้ติดต่อกลับ",
      "ผู้ทดสอบสามารถล้างข้อมูลจำลองจากหน้าเข้าสู่ระบบได้",
    ],
  },
  terms: {
    title: "เงื่อนไขการใช้งาน",
    lead: "เว็บไซต์นี้เป็น Wireframe/Prototype สำหรับตรวจสอบกระบวนการและยังไม่ใช่ระบบให้บริการจริง",
    items: [
      "ไม่มีการรับชำระเงินจริง",
      "ข้อมูลสินค้า ราคา บริการ และช่องทางติดต่อเป็นข้อมูลจำลอง",
      "รหัสคำขอและผลลัพธ์ใช้สำหรับการทดสอบเท่านั้น",
    ],
  },
  accessibility: {
    title: "การช่วยการเข้าถึง",
    lead: "ต้นแบบออกแบบให้ใช้งานด้วยคีย์บอร์ด รองรับการขยายตัวอักษร และคำนึงถึงผู้ใช้ที่ลดการเคลื่อนไหวบนหน้าจอ",
    items: [
      "ใช้ลิงก์ข้ามไปเนื้อหาหลักได้",
      "ส่วนควบคุมมีชื่อที่โปรแกรมอ่านหน้าจอเข้าใจได้",
      "หากพบอุปสรรคในการใช้งาน สามารถแจ้งผ่านหน้าติดต่อโครงการ",
    ],
  },
} as const

export function PolicyPageView({ kind }: { kind: PolicyKind }) {
  const policy = policies[kind]

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero description={policy.lead} title={policy.title} />
      <div className="site-container public-content-shell">
        <article className="article-shell">
          <div className="article-body">
            <p className="article-opening">{policy.lead}</p>
            <ul>
              {policy.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="action-row">
              <ButtonLink className="button button--secondary" href="/contact" variant="secondary">
                ติดต่อโครงการ
              </ButtonLink>
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}
