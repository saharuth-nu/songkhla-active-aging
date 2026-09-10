import Link from "next/link"
import { cn } from "@/lib/utils"

const campaign = {
  description: "ค้นหาบริการและกิจกรรมที่เหมาะกับคุณ",
  featuredServices: "SRV-001, SRV-002, SRV-003",
  headline: "เริ่มต้นสุขภาวะดีจากบริการใกล้บ้าน",
  id: "active-aging",
  name: "ก้าวไปด้วยกัน 2569",
  publishDate: "2026-09-01",
  source: "Facebook / QR / Event",
  status: "active",
  utmCampaign: "active-aging-2569",
  utmContent: "hero",
  utmMedium: "social",
  utmSource: "facebook",
  utmTerm: "",
}

export function AdminCampaignFormView({ id }: { id?: string }) {
  const editing = Boolean(id)
  return (
    <>
      <Header
        title={editing ? "แก้ไขแคมเปญ" : "สร้างแคมเปญ"}
        description="กำหนดเนื้อหา ช่องทาง UTM และบริการเด่นก่อนตรวจสอบ"
      />
      <form>
        <input name="originalId" type="hidden" value={id || ""} />
        <input name="imageCode" type="hidden" value={editing ? "CMP-HERO-01" : ""} />
        <div className="admin-form-layout">
          <section className="admin-form-card">
            <FormSection title="ข้อมูลและเนื้อหาแคมเปญ">
              <Field label="ชื่อแคมเปญ" value={editing ? campaign.name : ""} />
              <Field label="Slug" value={editing ? campaign.id : ""} />
              <Field full label="ข้อความพาดหัว" value={editing ? campaign.headline : ""} />
              <Field full label="คำอธิบาย" textarea value={editing ? campaign.description : ""} />
            </FormSection>
            <FormSection title="ช่องทางและการติดตามผล">
              <Field label="ช่องทางที่แสดง" value={editing ? campaign.source : ""} />
              <Field label="วันที่เผยแพร่" type="date" value={campaign.publishDate} />
              <Field label="UTM Source" value={editing ? campaign.utmSource : ""} />
              <Field label="UTM Medium" value={editing ? campaign.utmMedium : ""} />
              <Field label="UTM Campaign" value={editing ? campaign.utmCampaign : ""} />
              <Field
                label="UTM Content"
                required={false}
                value={editing ? campaign.utmContent : ""}
              />
              <Field
                full
                label="UTM Term"
                required={false}
                value={editing ? campaign.utmTerm : ""}
              />
            </FormSection>
            <FormSection title="บริการเด่นและการเผยแพร่">
              <Field
                full
                hint="คั่นแต่ละรหัสด้วยเครื่องหมายจุลภาค"
                label="รหัสบริการเด่น"
                value={editing ? campaign.featuredServices : ""}
              />
              <label className="admin-field">
                <span>
                  สถานะ <em>จำเป็น</em>
                </span>
                <select defaultValue="active" required>
                  <option disabled value="">
                    เลือกสถานะ
                  </option>
                  <option value="active">เปิดใช้งาน</option>
                  <option value="inactive">ปิดใช้งาน</option>
                </select>
              </label>
            </FormSection>
          </section>
          <aside className="admin-image-placeholder">
            <strong>{editing ? "มีรูปภาพแล้ว" : "ยังไม่มีรูปภาพ"}</strong>
            <span>{editing ? "รูปภาพพร้อมแสดงผล" : "จะเพิ่มรูปภาพในภายหลัง"}</span>
          </aside>
        </div>
        <div className="admin-form-actions">
          <Link href="/admin/campaigns">ยกเลิก</Link>
          <button className="workspace-button workspace-button--primary" type="submit">
            ตรวจสอบก่อนบันทึก
          </button>
        </div>
      </form>
    </>
  )
}

export function AdminEmptyReviewView({ kind }: { kind: "campaign" | "partner" }) {
  const campaignReview = kind === "campaign"
  const back = campaignReview ? "/admin/campaigns" : "/admin/partner-intake"
  return (
    <>
      <Header
        title="ไม่พบข้อมูลร่าง"
        description={
          campaignReview ? "เริ่มจากแบบฟอร์มแคมเปญก่อน" : "เริ่มจากหน้ารับข้อมูลจากภาคีก่อน"
        }
      />
      <section className="admin-state">
        <span aria-hidden="true">!</span>
        <div>
          <h2>{campaignReview ? "ไม่มีข้อมูลร่าง" : "ไม่มีข้อมูลร่าง"}</h2>
          <p>
            {campaignReview ? "ยังไม่มีแคมเปญสำหรับตรวจสอบ" : "ยังไม่มีรายการจากภาคีสำหรับตรวจสอบ"}
          </p>
          <Link className="workspace-button" href={back}>
            กลับ
          </Link>
        </div>
      </section>
    </>
  )
}

const transactions = {
  "TXN-0001": {
    amount: 0,
    area: "เมืองสงขลา · บ่อยาง",
    campaign: "Active Aging 2569",
    contact: "08X-XXX-0101",
    evidence: "ไม่ได้แนบ",
    historyAt: "2026-09-01T09:30:00+07:00",
    historyNote: "รับคำขอจาก Public Flow",
    method: "ไม่เสียค่าใช้จ่าย",
    provider: "ศูนย์สุขภาพชุมชนบ่อยาง",
    request: "REQ-0001",
    requester: "คุณสมใจ ใจดี",
    service: "ประเมินสุขภาพเบื้องต้นในชุมชน",
    source: "Facebook",
    status: "pending",
  },
  "TXN-0002": {
    amount: 500,
    area: "หาดใหญ่ · คอหงส์",
    campaign: "ตลาดชุมชนสงขลา",
    contact: "08X-XXX-0202",
    evidence: "PAY-EVD-0002",
    historyAt: "2026-08-30T15:30:00+07:00",
    historyNote: "ส่งมอบสินค้าเรียบร้อย",
    method: "โอนเงิน",
    provider: "วิสาหกิจชุมชนสมุนไพรสงขลา",
    request: "REQ-0002",
    requester: "ผู้ซื้อสินค้าชุมชน",
    service: "ชุดสมุนไพรพื้นถิ่นเพื่อการผ่อนคลาย",
    source: "Website",
    status: "completed",
  },
} as const

export function AdminTransactionDetailView({ id }: { id: string }) {
  const item = transactions[id as keyof typeof transactions]
  if (!item)
    return (
      <>
        <Header title="ไม่พบธุรกรรม" description="ตรวจสอบรหัสรายการอีกครั้ง" />
        <section className="admin-state">
          <span aria-hidden="true">!</span>
          <div>
            <h2>ไม่พบ {id}</h2>
            <p>ไม่พบธุรกรรมตามรหัสที่ระบุ</p>
            <Link className="workspace-button" href="/admin/transactions">
              กลับ
            </Link>
          </div>
        </section>
      </>
    )
  const completed = item.status === "completed"
  return (
    <>
      <Header
        action={
          <Link className="workspace-button" href="/admin/transactions">
            กลับรายการ
          </Link>
        }
        title={id}
        description={`คำขอ ${item.request} · ผู้ดูแลโครงการเป็นผู้ตรวจสอบและปรับสถานะ`}
      />
      <div className="ops-two-column">
        <Review
          title="ผู้ขอและบริการ"
          facts={[
            ["ผู้ขอ", item.requester],
            ["ติดต่อ", item.contact],
            ["สินค้า/บริการ", item.service],
            ["ผู้ให้บริการ", item.provider],
            ["พื้นที่", item.area],
            ["Source / Campaign", `${item.source} · ${item.campaign}`],
          ]}
        />
        <Review
          title="การชำระเงิน"
          facts={[
            ["ยอด", `${item.amount.toLocaleString("th-TH")} บาท`],
            ["วิธีชำระ", item.method],
            ["ระบุว่าจ่ายแล้ว", completed ? "ใช่" : "ยังไม่ระบุ"],
            ["รหัสหลักฐาน", item.evidence],
          ]}
        />
      </div>
      {completed ? (
        <div className="admin-notice">
          <strong>รายการสิ้นสุดแล้ว</strong>
          <span>สถานะนี้ไม่มีขั้นตอนถัดไป</span>
        </div>
      ) : (
        <form className="admin-form-card ops-status-form">
          <h2>ปรับสถานะโดยผู้ดูแลโครงการ</h2>
          <label className="admin-field">
            <span>
              สถานะถัดไป <em>จำเป็น</em>
            </span>
            <select defaultValue="" required>
              <option disabled value="">
                เลือกสถานะถัดไป
              </option>
              <option value="confirmed">ยืนยันแล้ว</option>
              <option value="cancelled">ยกเลิก</option>
            </select>
          </label>
          <Field label="หมายเหตุการประสานงาน" textarea value="" />
          <fieldset>
            <legend>การกระจายรายได้ในห่วงโซ่คุณค่า (กรอกเมื่อเสร็จสิ้น)</legend>
            <div className="admin-form-grid">
              <Field label="ผู้ผลิต" required={false} type="number" value="" />
              <Field label="ผู้ให้บริการ" required={false} type="number" value="" />
              <Field label="ชุมชน" required={false} type="number" value="" />
              <Field label="อื่น ๆ" required={false} type="number" value="" />
            </div>
          </fieldset>
          <button className="workspace-button workspace-button--primary" type="submit">
            บันทึกสถานะ
          </button>
        </form>
      )}
      <section className="ops-history">
        <h2>ประวัติสถานะ</h2>
        <ol>
          <li>
            <div>
              <span className={`admin-status admin-status--${item.status}`}>
                {completed ? "เสร็จสิ้น" : "รอตรวจสอบ"}
              </span>
              <time>{item.historyAt}</time>
            </div>
            <p>{item.historyNote}</p>
          </li>
        </ol>
      </section>
    </>
  )
}

function Header({
  action,
  description,
  title,
}: {
  action?: React.ReactNode
  description: string
  title: string
}) {
  return (
    <header className="admin-page-header">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </header>
  )
}
function FormSection({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="admin-form-section">
      <h2>{title}</h2>
      <div className="admin-form-grid">{children}</div>
    </section>
  )
}
function Field({
  full,
  hint,
  label,
  required = true,
  textarea,
  type = "text",
  value,
}: {
  full?: boolean
  hint?: string
  label: string
  required?: boolean
  textarea?: boolean
  type?: string
  value: string
}) {
  return (
    <label className={cn("admin-field", full && "admin-field--full")}>
      <span>
        {label}
        {required ? (
          <>
            {" "}
            <em>จำเป็น</em>
          </>
        ) : null}
      </span>
      {textarea ? (
        <textarea defaultValue={value} required={required} rows={4} />
      ) : (
        <input defaultValue={value} required={required} type={type} />
      )}
      {hint ? <small>{hint}</small> : null}
    </label>
  )
}
function Review({
  facts,
  title,
}: {
  facts: ReadonlyArray<readonly [string, string]>
  title: string
}) {
  return (
    <section className="admin-review-card">
      <h2>{title}</h2>
      <dl>
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
