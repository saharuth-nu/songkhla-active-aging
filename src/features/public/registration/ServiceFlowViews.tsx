"use client"

import Link from "next/link"
import { Button, ButtonLink } from "@/components/ui"
import { Breadcrumbs } from "../components/Breadcrumbs"
import { PublicIcon } from "../components/PublicIcon"
import { ResponsiveImage } from "../components/ResponsiveImage"
import {
  useConfirmRequest,
  useRequestForm,
  useRequestLookup,
  useStoredRequest,
} from "../hooks/useRequestFlow"
import { useStoredRegistration } from "../hooks/useRegistrationForm"
import { areas, services, type Service } from "../mocks/public-data"
import { FlowAlert } from "./FlowAlert"

export type RequestTracking = {
  campaign?: string
  intent?: string
  source?: string
  utmCampaign?: string
  utmContent?: string
  utmMedium?: string
  utmSource?: string
  utmTerm?: string
}

export function RequestEntryView({ service, nextHref }: { service: Service; nextHref: string }) {
  return (
    <ServiceFlow
      breadcrumbs={[
        { href: "/", label: "หน้าแรก" },
        { href: "/products", label: "สินค้าและบริการ" },
        { href: `/products/${service.id}`, label: service.title },
        { label: "เริ่มคำขอ" },
      ]}
      title="เริ่มคำขอ"
      description="ตรวจสอบรายการและเลือกว่าจะดำเนินการต่อหรือติดต่อโครงการก่อน"
    >
      <SelectedService service={service} />
      <section className="flow-summary">
        <div className="flow-summary__heading">
          <div>
            <p className="eyebrow">จุดตัดสินใจก่อนส่งข้อมูล</p>
            <h2>ต้องการดำเนินการกับรายการนี้อย่างไร?</h2>
          </div>
        </div>
        <p>
          ขั้นตอนถัดไปจะขอข้อมูลติดต่อ พื้นที่ และความยินยอมสำหรับการประสานงาน หากยังไม่พร้อม
          สามารถสอบถามทีมโครงการก่อนได้
        </p>
        <div className="action-row">
          <ButtonLink className="button" href={nextHref} icon={<PublicIcon name="arrow-right" />}>
            {service.action === "order" ? "ดำเนินการสั่งซื้อ" : "ดำเนินการขอรับบริการ"}
          </ButtonLink>
          <ButtonLink
            className="button button--secondary"
            href={`/contact?subject=${encodeURIComponent(`สอบถามก่อนส่งคำขอ: ${service.title}`)}`}
            variant="secondary"
          >
            ติดต่อโครงการก่อน
          </ButtonLink>
        </div>
      </section>
    </ServiceFlow>
  )
}

export function RequestFormView({
  service,
  tracking = {},
}: {
  service: Service
  tracking?: RequestTracking
}) {
  const noCharge = service.priceValue === 0
  const form = useRequestForm(service)
  return (
    <ServiceFlow
      breadcrumbs={[
        { href: "/", label: "หน้าแรก" },
        { href: "/products", label: "สินค้าและบริการ" },
        { href: `/products/${service.id}`, label: service.title },
        { label: service.action === "order" ? "แบบฟอร์มสั่งซื้อ" : "แบบฟอร์มขอรับบริการ" },
      ]}
      title={service.action === "order" ? "แบบฟอร์มสั่งซื้อ" : "แบบฟอร์มขอรับบริการ"}
      description="กรอกข้อมูลติดต่อ จำนวน พื้นที่ และวิธีชำระเงินจำลอง ก่อนตรวจสอบคำขอ"
    >
      <Stepper current={1} items={["กรอกคำขอ", "ตรวจสอบ", "รับรหัส", "ติดตาม"]} />
      <SelectedService service={service} />
      <form className="service-form" onSubmit={form.submit}>
        <div
          aria-live="assertive"
          className="flow-feedback"
          ref={form.feedbackRef}
          tabIndex={form.feedback ? -1 : undefined}
        >
          {form.feedback ? <FlowAlert {...form.feedback} /> : null}
        </div>
        <input name="intent" type="hidden" value={tracking.intent ?? service.action} />
        <input name="source" type="hidden" value={tracking.source ?? "Website"} />
        <input name="campaign" type="hidden" value={tracking.campaign ?? ""} />
        <input name="utmSource" type="hidden" value={tracking.utmSource ?? ""} />
        <input name="utmMedium" type="hidden" value={tracking.utmMedium ?? ""} />
        <input name="utmCampaign" type="hidden" value={tracking.utmCampaign ?? ""} />
        <input name="utmContent" type="hidden" value={tracking.utmContent ?? ""} />
        <input name="utmTerm" type="hidden" value={tracking.utmTerm ?? ""} />
        <section className="form-card">
          <div className="form-card__heading">
            <span>01</span>
            <div>
              <h2>ข้อมูลผู้ขอและพื้นที่</h2>
              <p>ใช้สำหรับติดต่อกลับและประสานรายการนี้</p>
            </div>
          </div>
          <div className="flow-form-grid">
            <FlowField label="ชื่อผู้ขอ / ผู้สั่งซื้อ" name="requesterName" />
            <FlowField label="เบอร์โทรศัพท์หรืออีเมล" name="contact" />
            <FlowField label="จำนวน" name="quantity" type="number" defaultValue="1" />
            <FlowSelect
              defaultValue={service.areaId}
              label="พื้นที่รับบริการ / รับสินค้า"
              name="areaId"
              placeholder="เลือกพื้นที่"
              options={areas.map((area) => ({ label: area.label, value: area.id }))}
            />
          </div>
        </section>
        <section className="form-card">
          <div className="form-card__heading">
            <span>02</span>
            <div>
              <h2>การชำระเงินจำลอง</h2>
              <p>ไม่มีการรับเงินจริงหรือเชื่อมต่อ Payment Gateway</p>
            </div>
          </div>
          <FlowSelect
            label="วิธีชำระเงิน"
            name="paymentMethod"
            placeholder={noCharge ? undefined : "เลือกวิธีชำระเงิน"}
            options={noCharge ? ["ไม่เสียค่าใช้จ่าย"] : ["ชำระปลายทาง (จำลอง)", "โอนเงิน (จำลอง)"]}
          />
          <div className="flow-checkbox-grid">
            <FlowCheckbox
              name="paymentDeclared"
              label="ทำเครื่องหมายว่า “จ่ายแล้ว”"
              description={
                noCharge
                  ? "รายการนี้ไม่มีค่าใช้จ่าย ไม่จำเป็นต้องเลือก"
                  : "เป็นสถานะจำลองและยังต้องรอตรวจสอบ"
              }
            />
            <FlowCheckbox
              name="evidence"
              label="แนบหลักฐานจำลอง"
              description="ใช้ชื่อไฟล์ slip-demo.jpg โดยไม่อัปโหลดไฟล์จริง"
            />
          </div>
        </section>
        <section className="form-card form-card--privacy">
          <div className="form-card__heading">
            <span>03</span>
            <div>
              <h2>ประกาศความเป็นส่วนตัวและความยินยอม</h2>
              <p>ข้อมูลใช้เพื่อบันทึกคำขอและให้ผู้ดูแลโครงการประสานผู้ให้บริการเท่านั้น</p>
            </div>
          </div>
          <div className="privacy-copy">
            <p>
              ต้นแบบนี้บันทึกข้อมูลจำลองไว้ในเบราว์เซอร์ ไม่มีการชำระเงินจริงหรือส่งข้อมูลไปภายนอก
              อ่านรายละเอียดได้ที่ <Link href="/privacy">ประกาศความเป็นส่วนตัว</Link>
            </p>
          </div>
          <FlowCheckbox
            name="consent"
            required
            label="ฉันได้อ่านและยินยอมให้ใช้ข้อมูลเพื่อดำเนินการตามคำขอนี้"
            description="ต้องยืนยันก่อนเข้าสู่หน้าตรวจสอบคำขอ"
          />
        </section>
        <aside className="tracking-note">
          <strong>ข้อมูลประกอบคำขอ</strong>
          <span>Source: Website</span>
          <span>Campaign: —</span>
          <span>UTM Source / Medium: Website / —</span>
          <span>UTM Campaign / Content / Term: — / — / —</span>
        </aside>
        <div className="flow-actions">
          <Link href={`/products/${service.id}`}>ยกเลิกและกลับรายละเอียด</Link>
          <Button className="button" icon={<PublicIcon name="arrow-right" />} type="submit">
            ตรวจสอบคำขอ
          </Button>
        </div>
      </form>
    </ServiceFlow>
  )
}

export function RequestConfirmView() {
  const confirmation = useConfirmRequest()
  if (confirmation.draft === undefined)
    return (
      <ServiceFlowState
        action="เลือกสินค้าและบริการ"
        href="/products"
        message="กำลังเตรียมข้อมูลคำขอจำลอง"
        title="กำลังโหลดข้อมูล"
      />
    )
  if (!confirmation.draft)
    return (
      <ServiceFlowState
        action="เลือกสินค้าและบริการ"
        href="/products"
        message="กรุณากรอกแบบฟอร์มคำขอก่อนเปิดหน้านี้"
        title="ยังไม่มีคำขอสำหรับตรวจสอบ"
      />
    )

  const draft = confirmation.draft
  const service = services.find((item) => item.id === draft.serviceId)
  if (!service)
    return (
      <ServiceFlowState
        action="เลือกสินค้าและบริการ"
        href="/products"
        message="ไม่พบสินค้าและบริการที่บันทึกไว้ในข้อมูลร่าง"
        title="ไม่พบรายการสำหรับตรวจสอบ"
      />
    )
  const area = areas.find((item) => item.id === draft.areaId)
  const editParams = new URLSearchParams({
    item: service.id,
    intent: draft.intent,
    source: draft.source,
  })
  if (draft.campaign) editParams.set("campaign", draft.campaign)
  if (draft.utmSource) editParams.set("utm_source", draft.utmSource)
  if (draft.utmMedium) editParams.set("utm_medium", draft.utmMedium)
  if (draft.utmCampaign) editParams.set("utm_campaign", draft.utmCampaign)
  if (draft.utmContent) editParams.set("utm_content", draft.utmContent)
  if (draft.utmTerm) editParams.set("utm_term", draft.utmTerm)
  const editHref = `/request/new?${editParams.toString()}`

  return (
    <ServiceFlow
      breadcrumbs={[
        { href: "/", label: "หน้าแรก" },
        { href: editHref, label: "กรอกคำขอ" },
        { label: "ตรวจสอบ" },
      ]}
      description="ตรวจความถูกต้องของรายการ ผู้ติดต่อ และการชำระเงินจำลอง โดยสามารถย้อนกลับไปแก้ไขได้"
      title="ตรวจสอบข้อมูลก่อนยืนยัน"
    >
      <Stepper current={2} items={["กรอกคำขอ", "ตรวจสอบ", "รับรหัส", "ติดตาม"]} />
      <div className="review-grid">
        <section className="review-card">
          <div className="review-card__heading">
            <h2>รายการที่เลือก</h2>
            <span className="status-badge status-badge--pending">รอตรวจสอบ</span>
          </div>
          <h3>{service.title}</h3>
          <dl className="flow-facts">
            <Fact label="ประเภท" value={draft.intent === "order" ? "สั่งซื้อ" : "ขอรับบริการ"} />
            <Fact label="จำนวน" value={String(draft.quantity)} />
            <Fact label="ยอดจำลอง" value={`${draft.amount.toLocaleString("th-TH")} บาท`} />
            <Fact label="พื้นที่" value={area?.label ?? "ไม่ระบุ"} />
          </dl>
        </section>
        <ReviewFacts
          title="ผู้ติดต่อ"
          facts={[
            ["ชื่อ", draft.requesterName],
            ["ช่องทางติดต่อ", draft.contact],
          ]}
        />
        <ReviewFacts
          title="การชำระเงินจำลอง"
          facts={[
            ["วิธีชำระ", draft.paymentMethod],
            ["ระบุว่าจ่ายแล้ว", draft.paymentDeclared ? "ใช่ (จำลอง)" : "ยังไม่ระบุ"],
            ["หลักฐาน", draft.evidence ?? "ไม่ได้แนบ"],
          ]}
        />
        <ReviewFacts
          title="แหล่งที่มา"
          facts={[
            ["Source", draft.source || "Website"],
            ["Campaign", draft.campaign || "—"],
            ["UTM Source", draft.utmSource || "—"],
            ["UTM Medium", draft.utmMedium || "—"],
            ["UTM Campaign", draft.utmCampaign || "—"],
            ["UTM Content", draft.utmContent || "—"],
            ["UTM Term", draft.utmTerm || "—"],
          ]}
        />
      </div>
      <form className="confirm-form" onSubmit={confirmation.submit}>
        <div
          aria-live="assertive"
          className="flow-feedback"
          ref={confirmation.feedbackRef}
          tabIndex={confirmation.feedback ? -1 : undefined}
        >
          {confirmation.feedback ? <FlowAlert {...confirmation.feedback} /> : null}
        </div>
        <details className="prototype-controls">
          <summary>ทดสอบสถานะผิดพลาด</summary>
          <FlowCheckbox
            description="Request และ Transaction จะยังไม่ถูกสร้าง"
            label="จำลองการยืนยันไม่สำเร็จ"
            name="simulateError"
          />
        </details>
        <div className="flow-actions">
          <Link href={editHref}>← กลับไปแก้ไข</Link>
          <Button
            className="button"
            disabled={confirmation.submitting}
            icon={<PublicIcon name="arrow-right" />}
            type="submit"
          >
            {confirmation.submitting ? "กำลังสร้างคำขอ…" : "ยืนยันคำขอ"}
          </Button>
        </div>
      </form>
    </ServiceFlow>
  )
}

export function RequestSuccessView({ code = "" }: { code?: string }) {
  const record = useStoredRequest(code)
  if (record === undefined)
    return (
      <ServiceFlowState
        action="ดูสินค้าและบริการ"
        href="/products"
        message="กำลังเตรียมข้อมูลคำขอจำลอง"
        title="กำลังโหลดข้อมูล"
      />
    )
  if (!record)
    return (
      <ServiceFlowState
        action="ดูสินค้าและบริการ"
        href="/products"
        message="กรุณาสร้างและยืนยันคำขอก่อนเปิดหน้าสำเร็จ"
        title="ไม่พบคำขอที่เพิ่งบันทึก"
      />
    )
  const service = services.find((item) => item.id === record.serviceId)
  return (
    <ServiceFlow
      description="ระบบบันทึก Request และ Transaction จำลองในเบราว์เซอร์นี้แล้ว"
      title="ส่งคำขอสำเร็จ"
    >
      <Stepper current={3} items={["กรอกคำขอ", "ตรวจสอบ", "รับรหัส", "ติดตาม"]} />
      <section className="flow-success">
        <span aria-hidden="true" className="flow-success__mark">
          ✓
        </span>
        <p>ส่งคำขอจำลองสำเร็จ</p>
        <h2>
          รหัสติดตาม <strong>{record.code}</strong>
        </h2>
        <small>ใช้รหัสนี้เพื่อตรวจสอบสถานะคำขอ</small>
      </section>
      <section className="flow-summary">
        <div className="flow-summary__heading">
          <div>
            <p className="eyebrow">สรุปรายการ</p>
            <h2>{service?.title ?? record.serviceId}</h2>
          </div>
          <span className="status-badge status-badge--pending">รอตรวจสอบ</span>
        </div>
        <dl className="flow-facts">
          <Fact label="จำนวน" value={String(record.quantity)} />
          <Fact label="วันที่สร้าง" value={formatDateTime(record.createdAt)} />
          <Fact label="Transaction" value={record.transactionId} />
          <Fact label="ยอดจำลอง" value={`${record.amount.toLocaleString("th-TH")} บาท`} />
        </dl>
        <div className="local-note">
          ไม่มีการชำระเงินจริง และข้อมูลทั้งหมดอยู่ในเบราว์เซอร์นี้เท่านั้น
        </div>
        <div className="action-row">
          <ButtonLink
            className="button"
            href={`/request/${record.code}`}
            icon={<PublicIcon name="arrow-right" />}
          >
            ติดตามสถานะคำขอ
          </ButtonLink>
          <ButtonLink className="button button--secondary" href="/" variant="secondary">
            กลับหน้าแรก
          </ButtonLink>
        </div>
      </section>
    </ServiceFlow>
  )
}

export function RegistrationSuccessView({ code }: { code?: string }) {
  const record = useStoredRegistration(code)
  if (record === undefined)
    return (
      <ServiceFlowState
        action="ไปหน้าลงทะเบียน"
        href="/register"
        message="กำลังเตรียมข้อมูลการลงทะเบียนจำลอง"
        title="กำลังโหลดข้อมูล"
      />
    )
  if (!record)
    return (
      <ServiceFlowState
        action="ไปหน้าลงทะเบียน"
        href="/register"
        message="กรุณากรอกแบบฟอร์มลงทะเบียนก่อนเปิดหน้าสำเร็จ"
        title="ไม่พบข้อมูลการลงทะเบียนล่าสุด"
      />
    )
  return (
    <ServiceFlow
      title="ลงทะเบียนสำเร็จ"
      description="บันทึกข้อมูลจำลองในเบราว์เซอร์นี้เรียบร้อยแล้ว"
    >
      <Stepper current={3} items={["กรอกข้อมูล", "ยืนยันความเป็นส่วนตัว", "สำเร็จ"]} />
      <section className="flow-success">
        <span aria-hidden="true" className="flow-success__mark">
          ✓
        </span>
        <p>ลงทะเบียนข้อมูลจำลองสำเร็จ</p>
        <h2>
          รหัสอ้างอิง <strong>{record.code}</strong>
        </h2>
        <small>โปรดเก็บรหัสนี้ไว้สำหรับการทดสอบต้นแบบ</small>
      </section>
      <section className="flow-summary">
        <div className="flow-summary__heading">
          <div>
            <p className="eyebrow">สรุปข้อมูล</p>
            <h2>ข้อมูลที่บันทึก</h2>
          </div>
          <span className="status-badge status-badge--completed">เสร็จสิ้น</span>
        </div>
        <dl className="flow-facts">
          <Fact label="รหัสผู้รับบริการ" value={record.beneficiaryId} />
          <Fact
            label="พื้นที่"
            value={areas.find((item) => item.id === record.areaId)?.label ?? "ไม่ระบุ"}
          />
          <Fact label="ช่วงอายุ / เพศ" value={`${record.ageGroup} · ${record.gender}`} />
          <Fact label="ประเภท" value={record.beneficiaryType} />
          <Fact
            label="บริการที่สนใจ"
            value={services.find((item) => item.id === record.serviceId)?.title ?? "ไม่ระบุ"}
          />
          <Fact
            label="การติดต่อกลับ"
            value={record.contact ? "ระบุช่องทางติดต่อแล้ว" : "ไม่ได้ระบุ"}
          />
          <Fact label="วันที่ให้ความยินยอม" value={formatDateTime(record.consentAt)} />
          <Fact label="การรับบริการ" value="รอผู้ดูแลโครงการยืนยัน" />
        </dl>
        <div className="local-note">
          ข้อมูลอยู่ใน localStorage ของเบราว์เซอร์นี้เท่านั้น ไม่มีการส่งออกจากเครื่อง
        </div>
        <div className="action-row">
          <ButtonLink className="button" href="/products" icon={<PublicIcon name="arrow-right" />}>
            ดูสินค้าและบริการ
          </ButtonLink>
          <ButtonLink className="button button--secondary" href="/register" variant="secondary">
            ลงทะเบียนรายการใหม่
          </ButtonLink>
        </div>
      </section>
    </ServiceFlow>
  )
}

export function RequestLookupView() {
  const form = useRequestLookup()
  return (
    <ServiceFlow
      title="ติดตามสถานะคำขอ"
      description="กรอกรหัสรูปแบบ REQ-0001 เพื่อตรวจข้อมูลจำลองที่บันทึกในเบราว์เซอร์นี้"
    >
      <section className="lookup-card">
        <div>
          <p className="eyebrow">ตรวจสอบคำขอ</p>
          <h2>ใส่รหัสติดตามของคุณ</h2>
          <p>
            ทดลองได้ด้วยรหัสเริ่มต้น <strong>REQ-0001</strong>
          </p>
        </div>
        <form onSubmit={form.submit}>
          <div
            aria-live="assertive"
            className="flow-feedback"
            ref={form.feedbackRef}
            tabIndex={form.feedback ? -1 : undefined}
          >
            {form.feedback ? <FlowAlert {...form.feedback} /> : null}
          </div>
          <label className="flow-field">
            <span className="flow-field__label">
              รหัสคำขอ <span>*</span>
            </span>
            <input name="code" placeholder="REQ-0001" required />
          </label>
          <Button className="button" icon={<PublicIcon name="search" />} type="submit">
            ตรวจสอบสถานะ
          </Button>
        </form>
      </section>
    </ServiceFlow>
  )
}

export function RequestStatusView({ code }: { code: string }) {
  const record = useStoredRequest(code)
  if (record === undefined)
    return (
      <ServiceFlowState
        action="กรอกรหัสอีกครั้ง"
        href="/request"
        message="กำลังตรวจสอบข้อมูลคำขอจำลอง"
        title="กำลังโหลดข้อมูล"
      />
    )
  if (!record)
    return (
      <ServiceFlow
        breadcrumbs={[
          { href: "/", label: "หน้าแรก" },
          { href: "/request", label: "ติดตามสถานะ" },
          { label: code },
        ]}
        description="ตรวจสอบรหัสแล้วลองอีกครั้ง หรือใช้ REQ-0001 สำหรับข้อมูลเริ่มต้น"
        title="ไม่พบรหัสคำขอ"
      >
        <FlowAlert
          message="รหัสนี้ยังไม่มีอยู่ในข้อมูลจำลองของเบราว์เซอร์นี้"
          title={`ไม่พบรหัส ${code}`}
        />
        <div className="action-row">
          <ButtonLink className="button" href="/request" icon={<PublicIcon name="arrow-right" />}>
            กรอกรหัสอีกครั้ง
          </ButtonLink>
        </div>
      </ServiceFlow>
    )
  const service = services.find((item) => item.id === record.serviceId)
  const area = areas.find((item) => item.id === record.areaId)
  return (
    <ServiceFlow
      breadcrumbs={[
        { href: "/", label: "หน้าแรก" },
        { href: "/request", label: "ติดตามสถานะ" },
        { label: record.code },
      ]}
      title={`สถานะคำขอ ${record.code}`}
      description="ข้อมูลสถานะจำลองล่าสุดในเบราว์เซอร์นี้"
    >
      <Stepper current={4} items={["กรอกคำขอ", "ตรวจสอบ", "รับรหัส", "ติดตาม"]} />
      <div className="status-heading">
        <div>
          <p className="eyebrow">สถานะล่าสุด</p>
          <h2>{service?.title ?? record.serviceId}</h2>
        </div>
        <span className="status-badge status-badge--pending">รอตรวจสอบ</span>
      </div>
      <ol className="status-timeline">
        <li className="is-active">
          <span>✓</span>
          <div>
            <strong>รอตรวจสอบ</strong>
            <small>ระบบรับคำขอแล้ว</small>
          </div>
        </li>
        <li>
          <span>2</span>
          <div>
            <strong>ยืนยันคำขอ</strong>
            <small>ทีมงานยืนยันรายการ</small>
          </div>
        </li>
        <li>
          <span>3</span>
          <div>
            <strong>เสร็จสิ้น</strong>
            <small>ส่งมอบหรือให้บริการแล้ว</small>
          </div>
        </li>
      </ol>
      <div className="status-detail-grid">
        <section className="review-card">
          <h2>ข้อมูลคำขอ</h2>
          <dl className="flow-facts">
            <Fact label="รายการ" value={service?.title ?? record.serviceId} />
            <Fact label="จำนวน" value={String(record.quantity)} />
            <Fact label="พื้นที่" value={area?.label ?? "ไม่ระบุ"} />
            <Fact label="สร้างเมื่อ" value={formatDateTime(record.createdAt)} />
          </dl>
        </section>
        <section className="review-card">
          <h2>Transaction จำลอง</h2>
          <dl className="flow-facts">
            <Fact label="รหัส" value={record.transactionId} />
            <Fact label="ยอด" value={`${record.amount.toLocaleString("th-TH")} บาท`} />
            <Fact label="วิธีชำระ" value={record.paymentMethod} />
            <Fact label="หลักฐาน" value={record.evidence ?? "ไม่ได้แนบ"} />
          </dl>
        </section>
      </div>
      <div className="action-row">
        <ButtonLink className="button button--secondary" href="/request" variant="secondary">
          ตรวจสอบรหัสอื่น
        </ButtonLink>
        <ButtonLink
          className="button button--secondary"
          href={`/contact?subject=${encodeURIComponent(`สอบถามสถานะ ${record.code}`)}`}
          variant="secondary"
        >
          ติดต่อโครงการ
        </ButtonLink>
      </div>
    </ServiceFlow>
  )
}

export function ServiceFlowState({
  action,
  href,
  message,
  title,
}: {
  action: string
  href: string
  message: string
  title: string
}) {
  return (
    <ServiceFlow description={message} title={title}>
      <section className="service-flow-state">
        <span aria-hidden="true">?</span>
        <h2>{title}</h2>
        <p>{message}</p>
        <ButtonLink className="button" href={href} icon={<PublicIcon name="arrow-right" />}>
          {action}
        </ButtonLink>
      </section>
    </ServiceFlow>
  )
}

function ServiceFlow({
  breadcrumbs,
  children,
  description,
  title,
}: {
  breadcrumbs?: ReadonlyArray<{ href?: string; label: string }>
  children: React.ReactNode
  description: string
  title: string
}) {
  return (
    <main className="service-flow-page" id="main-content" tabIndex={-1}>
      <header className="service-flow-hero">
        <div className="site-container">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </header>
      <div className="service-flow-breadcrumb">
        <div className="site-container">
          <Breadcrumbs items={breadcrumbs || [{ href: "/", label: "หน้าแรก" }, { label: title }]} />
        </div>
      </div>
      <div className="site-container service-flow-shell">{children}</div>
    </main>
  )
}

function Stepper({ current, items }: { current: number; items: ReadonlyArray<string> }) {
  return (
    <ol
      aria-label="ขั้นตอนการดำเนินการ"
      className="flow-stepper"
      style={{ "--step-count": items.length } as React.CSSProperties}
    >
      {items.map((item, index) => {
        const state =
          index + 1 < current ? "complete" : index + 1 === current ? "current" : "upcoming"
        return (
          <li
            aria-current={state === "current" ? "step" : undefined}
            className={`flow-stepper__item flow-stepper__item--${state}`}
            key={item}
          >
            <span>{state === "complete" ? "✓" : index + 1}</span>
            <small>{item}</small>
          </li>
        )
      })}
    </ol>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

function ReviewFacts({
  facts,
  title,
}: {
  facts: ReadonlyArray<readonly [string, string]>
  title: string
}) {
  return (
    <section className="review-card">
      <h2>{title}</h2>
      <dl className="flow-facts">
        {facts.map(([label, value]) => (
          <Fact key={label} label={label} value={value} />
        ))}
      </dl>
    </section>
  )
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}

function SelectedService({ service }: { service: Service }) {
  return (
    <article className="selected-service">
      <div className="selected-service__media">
        <ResponsiveImage image={service.image} />
      </div>
      <div>
        <span className="badge badge--service">{service.type}</span>
        <h2>{service.title}</h2>
        <p>{service.excerpt}</p>
        <dl className="flow-facts">
          <Fact label="ราคา/ค่าใช้จ่าย" value={service.priceLabel} />
          <Fact label="ผู้ให้บริการ" value={service.provider} />
        </dl>
      </div>
    </article>
  )
}

function FlowField({
  defaultValue,
  label,
  name,
  type = "text",
}: {
  defaultValue?: string
  label: string
  name: string
  type?: string
}) {
  return (
    <label className="flow-field">
      <span className="flow-field__label">
        {label} <span>*</span>
      </span>
      <input defaultValue={defaultValue} name={name} required type={type} />
    </label>
  )
}

function FlowSelect({
  defaultValue = "",
  label,
  name,
  options,
  placeholder,
}: {
  defaultValue?: string
  label: string
  name: string
  options: ReadonlyArray<string | { label: string; value: string }>
  placeholder?: string
}) {
  return (
    <label className="flow-field">
      <span className="flow-field__label">
        {label} <span>*</span>
      </span>
      <select defaultValue={defaultValue} name={name} required>
        {placeholder ? (
          <option disabled value="">
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => {
          const value = typeof option === "string" ? option : option.value
          const label = typeof option === "string" ? option : option.label
          return (
            <option key={value} value={value}>
              {label}
            </option>
          )
        })}
      </select>
    </label>
  )
}

function FlowCheckbox({
  description,
  label,
  name,
  required,
}: {
  description: string
  label: string
  name: string
  required?: boolean
}) {
  return (
    <label className="flow-checkbox">
      <input name={name} required={required} type="checkbox" value="1" />
      <span>
        <strong>{label}</strong>
        <small>{description}</small>
      </span>
    </label>
  )
}
