import Link from "next/link"

const moduleOptions = [
  "ผู้รับบริการ",
  "สินค้าและบริการ",
  "การพัฒนาศักยภาพ",
  "การถ่ายทอดเทคโนโลยี",
  "การจ้างงาน",
  "ภาคีเครือข่าย",
  "นวัตกรรม",
  "จัดการเนื้อหา",
  "ผู้ใช้และสิทธิ์",
]

export function AdminImportExportView() {
  return (
    <>
      <Header title="นำเข้าและส่งออกข้อมูล" description="ตรวจสอบแม่แบบและขอบเขตก่อนยืนยัน" />
      <div className="ops-two-column">
        <form className="admin-form-card">
          <h2>นำเข้าข้อมูล</h2>
          <p>
            <a
              className="workspace-button"
              download
              href="data:text/csv;charset=utf-8,id%2Carea%2CageGroup%2CconsentDate"
            >
              ดาวน์โหลดแม่แบบผู้รับบริการ
            </a>{" "}
            <a
              className="workspace-button"
              download
              href="data:text/csv;charset=utf-8,id%2Cname%2Ctype%2Cprovider%2Carea%2Cprice"
            >
              ดาวน์โหลดแม่แบบสินค้า/บริการ
            </a>
          </p>
          <div className="admin-form-grid admin-form-grid--single">
            <Select label="ชุดข้อมูล" options={moduleOptions.slice(0, 2)} />
            <Field label="ชื่อไฟล์" hint="เช่น services-import.csv" />
          </div>
          <button className="workspace-button workspace-button--primary" type="submit">
            ตรวจสอบตัวอย่าง
          </button>
        </form>
        <form className="admin-form-card">
          <h2>ส่งออกข้อมูล</h2>
          <div className="admin-form-grid admin-form-grid--single">
            <Select label="ชุดข้อมูล" options={moduleOptions} />
            <Select label="ช่วงเวลา" options={["2026-Q3", "2026-Q2", "2026-YTD"]} />
            <Select
              label="พื้นที่"
              options={[
                "ทุกพื้นที่",
                "เมืองสงขลา · บ่อยาง",
                "หาดใหญ่ · คอหงส์",
                "สิงหนคร · หัวเขา",
                "สะเดา · สำนักขาม",
              ]}
            />
            <Select label="รูปแบบไฟล์" options={["CSV", "Excel (.xlsx)"]} />
          </div>
          <button className="workspace-button" type="submit">
            ตรวจสอบขอบเขต
          </button>
        </form>
      </div>
    </>
  )
}

export function AdminCampaignsView() {
  return (
    <>
      <Header
        action={
          <Link className="workspace-button workspace-button--primary" href="/admin/campaigns/new">
            สร้างแคมเปญ
          </Link>
        }
        title="จัดการหน้าแคมเปญ"
        description="สร้างข้อความ บริการเด่น รูปภาพ และ UTM สำหรับการประชาสัมพันธ์"
      />
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>แคมเปญ</th>
              <th>รูปภาพ</th>
              <th>ช่องทาง</th>
              <th>สถานะ</th>
              <th>ดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>ก้าวไปด้วยกัน 2569</strong>
                <small>active-aging</small>
              </td>
              <td>
                <span className="admin-image-status admin-image-status--ready">มีรูปภาพแล้ว</span>
              </td>
              <td>Facebook / QR / Event</td>
              <td>
                <span className="admin-status admin-status--active">เปิดใช้งาน</span>
              </td>
              <td>
                <Link href="/admin/campaigns/active-aging">ดู/แก้ไข →</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export function AdminPartnerIntakeView() {
  return (
    <>
      <Header
        title="รับข้อมูลจากภาคีผ่านผู้ดูแลโครงการ"
        description="ไม่มีบัญชีภาคี ผู้ดูแลโครงการบันทึกแหล่งที่มาและส่งต่อเป็นข้อมูลร่างของหมวดที่เกี่ยวข้อง"
      />
      <div className="ops-flow">
        <span>ภาคีส่งข้อมูล</span>
        <b>→</b>
        <span>ผู้ดูแลรับข้อมูล</span>
        <b>→</b>
        <span>ตรวจสอบสรุป</span>
        <b>→</b>
        <span>กรอกข้อมูลหลัก</span>
      </div>
      <form className="admin-form-card">
        <div className="admin-form-grid">
          <Select
            label="ประเภทข้อมูล / ปลายทาง"
            options={[
              "ภาคีเครือข่าย",
              "สินค้าและบริการ",
              "การพัฒนาศักยภาพ",
              "การถ่ายทอดเทคโนโลยี",
              "การจ้างงาน",
              "นวัตกรรม",
              "จัดการเนื้อหา",
            ]}
          />
          <Field label="ชื่อภาคี" />
          <Field label="ชื่อผู้ให้ข้อมูล" />
          <Field label="ช่องทางติดต่อกลับ" />
          <Select
            label="ช่องทางที่ได้รับข้อมูล"
            options={["โทรศัพท์", "LINE / Chat", "อีเมล", "ประชุม / ลงพื้นที่", "เอกสารจากภาคี"]}
          />
          <Field label="วันที่รับข้อมูล" type="date" />
          <Field label="หัวข้อ / ชื่อรายการ" />
          <label className="admin-field">
            <span>
              รายละเอียดที่ได้รับ <em>จำเป็น</em>
            </span>
            <textarea required rows={4} />
          </label>
          <Field
            label="รหัสไฟล์/หลักฐาน"
            hint="หากยังไม่มีไฟล์จริง ให้ใส่รหัส เช่น PRT-EVD-01"
            required={false}
          />
        </div>
        <label className="ops-check">
          <input required type="checkbox" />
          <span>ยืนยันว่าได้รับข้อมูลจากภาคีและสามารถนำไปตรวจสอบต่อได้</span>
        </label>
        <button className="workspace-button workspace-button--primary" type="submit">
          ตรวจสอบข้อมูลจากภาคี
        </button>
      </form>
      <section className="ops-history">
        <h2>ประวัติการส่งต่อ</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Intake</th>
                <th>ผู้ให้ข้อมูล</th>
                <th>หัวข้อ/ปลายทาง</th>
                <th>แหล่งที่มา</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5}>ยังไม่มีประวัติข้อมูลจากภาคี</td>
              </tr>
            </tbody>
          </table>
        </div>
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
function Field({
  hint,
  label,
  required = true,
  type = "text",
}: {
  hint?: string
  label: string
  required?: boolean
  type?: string
}) {
  return (
    <label className="admin-field">
      <span>
        {label} {required ? <em>จำเป็น</em> : null}
      </span>
      <input required={required} type={type} />
      {hint ? <small>{hint}</small> : null}
    </label>
  )
}
function Select({ label, options }: { label: string; options: ReadonlyArray<string> }) {
  return (
    <label className="admin-field">
      <span>
        {label} <em>จำเป็น</em>
      </span>
      <select defaultValue="" required>
        <option disabled value="">
          เลือก{label}
        </option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  )
}
