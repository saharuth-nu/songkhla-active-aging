"use client"

import Link from "next/link"
import { Button } from "@/components/ui"
import { Breadcrumbs } from "../components/Breadcrumbs"
import { PublicIcon } from "../components/PublicIcon"
import { useRegistrationForm } from "../hooks/useRegistrationForm"
import { areas, services } from "../mocks/public-data"
import { FlowAlert } from "./FlowAlert"

type Option = { label: string; value: string }

export function RegistrationPageView({ selectedService = "" }: { selectedService?: string }) {
  const form = useRegistrationForm()

  return (
    <main className="service-flow-page" id="main-content" tabIndex={-1}>
      <header className="service-flow-hero">
        <div className="site-container">
          <h1>ลงทะเบียนรับบริการ</h1>
          <p>
            ให้ข้อมูลพื้นฐานเพื่อช่วยให้โครงการวางแผนบริการ ข้อมูลทั้งหมดในต้นแบบนี้เป็นข้อมูลจำลอง
          </p>
        </div>
      </header>
      <div className="service-flow-breadcrumb">
        <div className="site-container">
          <Breadcrumbs items={[{ href: "/", label: "หน้าแรก" }, { label: "ลงทะเบียนรับบริการ" }]} />
        </div>
      </div>
      <div className="site-container service-flow-shell">
        <ol
          aria-label="ขั้นตอนการดำเนินการ"
          className="flow-stepper"
          style={{ "--step-count": 3 } as React.CSSProperties}
        >
          {[
            ["กรอกข้อมูล", "current"],
            ["ยืนยันความเป็นส่วนตัว", "upcoming"],
            ["สำเร็จ", "upcoming"],
          ].map(([label, state], index) => (
            <li
              aria-current={state === "current" ? "step" : undefined}
              className={`flow-stepper__item flow-stepper__item--${state}`}
              key={label}
            >
              <span>{index + 1}</span>
              <small>{label}</small>
            </li>
          ))}
        </ol>

        <form className="service-form" onSubmit={form.submit}>
          <div
            aria-live="assertive"
            className="flow-feedback"
            ref={form.feedbackRef}
            tabIndex={form.feedback ? -1 : undefined}
          >
            {form.feedback ? <FlowAlert {...form.feedback} /> : null}
          </div>
          <FormCard
            description="ใช้สำหรับสรุปข้อมูลภาพรวม ไม่จำเป็นต้องระบุชื่อบุคคล"
            number="01"
            title="ข้อมูลพื้นที่และผู้รับบริการ"
          >
            <SelectField
              id="registration-area"
              label="พื้นที่ / ตำบล"
              name="areaId"
              options={areas.map((item) => ({ label: item.label, value: item.id }))}
              placeholder="เลือกพื้นที่"
            />
            <SelectField
              id="registration-age"
              label="ช่วงอายุ"
              name="ageGroup"
              options={["ต่ำกว่า 50 ปี", "50–59 ปี", "60–69 ปี", "70–79 ปี", "80 ปีขึ้นไป"].map(
                (value) => ({ label: value, value }),
              )}
              placeholder="เลือกช่วงอายุ"
            />
            <SelectField
              id="registration-gender"
              label="เพศ"
              name="gender"
              options={["หญิง", "ชาย", "ไม่ประสงค์ระบุ", "อื่น ๆ"].map((value) => ({
                label: value,
                value,
              }))}
              placeholder="เลือกเพศ"
            />
            <SelectField
              id="registration-type"
              label="ลงทะเบียนในฐานะ"
              name="beneficiaryType"
              options={[
                { label: "ผู้รับบริการลงทะเบียนด้วยตนเอง", value: "ลงทะเบียนด้วยตนเอง" },
                { label: "ผู้ดูแลลงทะเบียนแทน", value: "ผู้ดูแลลงทะเบียนแทน" },
                { label: "บุคคลทั่วไปที่สนใจข้อมูลโครงการ", value: "ผู้สนใจข้อมูลโครงการ" },
              ]}
              placeholder="เลือกประเภท"
            />
          </FormCard>

          <FormCard
            description="เลือกบริการหนึ่งรายการสำหรับการลงทะเบียนครั้งนี้"
            number="02"
            title="บริการและช่องทางติดต่อ"
          >
            <SelectField
              defaultValue={selectedService}
              id="registration-service"
              label="สินค้า / บริการ"
              name="serviceId"
              options={services.map((item) => ({ label: item.title, value: item.id }))}
              placeholder="เลือกบริการที่สนใจ"
            />
            <SelectField
              id="registration-relationship"
              label="ความเกี่ยวข้องกับบริการ"
              name="serviceRelationship"
              options={["สนใจรับบริการ", "เคยรับบริการแล้ว", "ผู้ดูแลกำลังหาข้อมูล"].map(
                (value) => ({ label: value, value }),
              )}
              placeholder="เลือกความเกี่ยวข้อง"
            />
            <label className="flow-field" htmlFor="registration-contact">
              <span className="flow-field__label">เบอร์โทรศัพท์หรืออีเมล (ไม่บังคับ)</span>
              <input autoComplete="email" id="registration-contact" name="contact" />
              <small>กรอกเมื่อประสงค์ให้ทีมงานติดต่อกลับ</small>
            </label>
          </FormCard>

          <section className="form-card form-card--privacy">
            <FormCardHeading
              description="อ่านข้อมูลฉบับย่อก่อนยืนยัน"
              number="03"
              title="ประกาศความเป็นส่วนตัวและความยินยอม"
            />
            <div className="privacy-copy">
              <strong>โครงการนำข้อมูลไปใช้อย่างไร</strong>
              <p>
                ใช้ข้อมูลพื้นที่ ช่วงอายุ ประเภทผู้รับบริการ และบริการที่สนใจ
                เพื่อสรุปผลระดับภาพรวมและวางแผนบริการ ข้อมูลติดต่อใช้เฉพาะกรณีที่ขอให้ประสานกลับ
              </p>
              <p>
                ต้นแบบนี้บันทึกข้อมูลจำลองไว้ในเบราว์เซอร์เท่านั้น และไม่มีการส่งไปยังระบบภายนอก
              </p>
            </div>
            <CheckboxField
              description="ต้องยืนยันก่อนจึงจะลงทะเบียนได้"
              id="registration-consent"
              label="ฉันได้อ่านและยินยอมตามวัตถุประสงค์ข้างต้น"
              name="consent"
              required
            />
          </section>

          <details className="prototype-controls">
            <summary>ทดสอบสถานะผิดพลาด</summary>
            <CheckboxField
              description="ไม่มีข้อมูลถูกบันทึกเมื่อเปิดตัวเลือกนี้"
              id="registration-error"
              label="จำลองการบันทึกไม่สำเร็จ"
              name="simulateError"
            />
          </details>
          <div className="flow-actions">
            <Link href="/">ยกเลิกและกลับหน้าแรก</Link>
            <Button
              className="button"
              disabled={form.submitting}
              icon={<PublicIcon name="arrow-right" />}
              type="submit"
            >
              {form.submitting ? "กำลังบันทึก…" : "ยืนยันและลงทะเบียน"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}

function FormCard({
  children,
  description,
  number,
  title,
}: {
  children: React.ReactNode
  description: string
  number: string
  title: string
}) {
  return (
    <section className="form-card">
      <FormCardHeading description={description} number={number} title={title} />
      <div className="flow-form-grid">{children}</div>
    </section>
  )
}

function FormCardHeading({
  description,
  number,
  title,
}: {
  description: string
  number: string
  title: string
}) {
  return (
    <div className="form-card__heading">
      <span>{number}</span>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}

function SelectField({
  defaultValue = "",
  id,
  label,
  name,
  options,
  placeholder,
}: {
  defaultValue?: string
  id: string
  label: string
  name: string
  options: ReadonlyArray<Option>
  placeholder: string
}) {
  return (
    <label className="flow-field" htmlFor={id}>
      <span className="flow-field__label">
        {label} <span>*</span>
      </span>
      <select defaultValue={defaultValue} id={id} name={name} required>
        <option disabled value="">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

function CheckboxField({
  description,
  id,
  label,
  name,
  required = false,
}: {
  description: string
  id: string
  label: string
  name: string
  required?: boolean
}) {
  return (
    <label className="flow-checkbox" htmlFor={id}>
      <input id={id} name={name} required={required} type="checkbox" value="1" />
      <span>
        <strong>{label}</strong>
        <small>{description}</small>
      </span>
    </label>
  )
}
