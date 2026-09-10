"use client"

import { Button } from "@/components/ui"
import { PageHero } from "../components/PageHero"
import { PublicIcon } from "../components/PublicIcon"
import { useContactForm } from "../hooks/useContactForm"
import { contactChannels } from "../mocks/public-data"

export function ContactPageView({ initialSubject = "" }: { initialSubject?: string }) {
  const form = useContactForm()

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        description="ส่งคำถามหรือขอให้ทีมงานช่วยประสานบริการจากข้อมูลจำลอง"
        title="ติดต่อโครงการ"
      />
      <div className="site-container public-content-shell">
        <div className="contact-page-grid">
          <section className="contact-channel-panel">
            <p className="eyebrow">Contact information</p>
            <h2>ช่องทางติดต่อ</h2>
            <dl>
              {contactChannels.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mock-disclaimer">ข้อมูลติดต่อทั้งหมดเป็นข้อมูลจำลอง</p>
          </section>
          <form className="contact-form" onSubmit={form.submit}>
            <div
              className="contact-feedback"
              hidden={!form.reference}
              ref={form.feedbackRef}
              role={form.reference ? "status" : undefined}
              tabIndex={-1}
            >
              {form.reference ? (
                <>
                  <strong>ส่งข้อความจำลองแล้ว</strong>
                  <p>เลขอ้างอิง {form.reference} · ไม่มีการส่งข้อมูลออกจากเครื่อง</p>
                </>
              ) : null}
            </div>
            <div>
              <p className="eyebrow">Send a message</p>
              <h2>แบบฟอร์มติดต่อ</h2>
              <p>ทีมงานจะใช้ข้อมูลนี้เพื่อประสานกลับ</p>
            </div>
            <label>
              <span>ชื่อผู้ติดต่อ *</span>
              <input autoComplete="name" name="name" required />
            </label>
            <label>
              <span>เบอร์โทรศัพท์หรืออีเมล *</span>
              <input autoComplete="email" name="contact" required />
            </label>
            <label>
              <span>เรื่องที่ต้องการสอบถาม *</span>
              <input defaultValue={initialSubject} name="subject" required />
            </label>
            <label>
              <span>รายละเอียด *</span>
              <textarea name="message" required rows={5} />
            </label>
            <Button className="button" icon={<PublicIcon name="arrow-right" />} type="submit">
              ส่งข้อความจำลอง
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}
