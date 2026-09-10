import Link from "next/link"
import { cn } from "@/lib/utils"
import { adminModules, adminStatusLabels, type AdminModuleKey } from "../mocks/admin-data"

const fields: Record<AdminModuleKey, ReadonlyArray<string>> = {
  beneficiaries: [
    "ชื่อแสดงผล",
    "ช่วงอายุ",
    "พื้นที่ (อำเภอ · ตำบล)",
    "บริการที่ได้รับ",
    "วันที่รับบริการ",
    "ผลประเมินก่อนรับบริการ (Baseline)",
    "ผลประเมินระหว่างรับบริการ (Midline)",
    "ผลประเมินหลังรับบริการ (Endline)",
    "ความยินยอมใช้ข้อมูล",
    "วันที่ให้ความยินยอม",
    "สถานะ",
  ],
  services: [
    "ชื่อสินค้า/บริการ",
    "ประเภท",
    "ผู้ให้บริการ",
    "พื้นที่ (อำเภอ · ตำบล)",
    "ราคา/ช่วงราคา",
    "รายละเอียด",
    "กลุ่มเป้าหมาย/เงื่อนไข",
    "การดำเนินการหลัก",
    "รหัสหลักฐาน",
    "รหัสภาพ",
    "สถานะ",
  ],
  trainings: [
    "ชื่อกิจกรรม",
    "รหัสผู้เข้าร่วม",
    "ประเภทผู้เข้าร่วม",
    "หน่วยงาน/ภาคี",
    "พื้นที่ (อำเภอ · ตำบล)",
    "วันที่จัดกิจกรรม",
    "คะแนนก่อนกิจกรรม",
    "คะแนนหลังกิจกรรม",
    "รหัสหลักฐาน",
    "สถานะ",
  ],
  "tech-transfer": [
    "นวัตกรรม",
    "รหัส/ชื่อผู้รับการถ่ายทอด",
    "หน่วยงาน/ภาคี",
    "พื้นที่ (อำเภอ · ตำบล)",
    "วันที่ถ่ายทอด",
    "รหัสหลักฐาน",
    "สถานะ",
  ],
  employments: [
    "รหัสบุคคล",
    "ตำแหน่งงาน",
    "ประเภทการจ้างงาน",
    "หน่วยงาน/ภาคี",
    "พื้นที่ (อำเภอ · ตำบล)",
    "วันที่เริ่มงาน",
    "รหัสหลักฐาน",
    "สถานะ",
  ],
  partners: [
    "ชื่อหน่วยงาน/เครือข่าย",
    "ประเภทภาคี",
    "พื้นที่ (อำเภอ · ตำบล)",
    "ประเภทข้อตกลง",
    "วันที่เริ่มข้อตกลง",
    "รหัสหลักฐาน",
    "รหัสโลโก้/ภาพ",
    "สถานะ",
  ],
  innovations: [
    "ชื่อนวัตกรรม",
    "ประเภทนวัตกรรม",
    "พื้นที่ (อำเภอ · ตำบล)",
    "ระยะการนำไปใช้",
    "บทบาทในห่วงโซ่คุณค่า",
    "รหัสหลักฐาน",
    "รหัสภาพ",
    "สถานะ",
  ],
  content: [
    "ชื่อเนื้อหา",
    "ประเภทเนื้อหา",
    "ข้อความสรุป",
    "เนื้อหา",
    "ช่องทางเผยแพร่",
    "แคมเปญที่เกี่ยวข้อง",
    "วันที่เผยแพร่",
    "การเข้าถึง",
    "การมีส่วนร่วม",
    "การคลิก",
    "Landing URL",
    "รหัสภาพ",
    "สถานะ",
  ],
  users: ["ชื่อแสดงผล", "ชื่อผู้ใช้", "บทบาท", "สถานะ"],
}

const imageLabels = new Set(["รหัสภาพ", "รหัสโลโก้/ภาพ"])
const textareas = new Set(["รายละเอียด", "ข้อความสรุป", "เนื้อหา"])
const fullWidth = new Set(["รายละเอียด", "กลุ่มเป้าหมาย/เงื่อนไข", "ข้อความสรุป", "เนื้อหา"])
const dateFields = new Set([
  "วันที่รับบริการ",
  "วันที่ให้ความยินยอม",
  "วันที่จัดกิจกรรม",
  "วันที่ถ่ายทอด",
  "วันที่เริ่มงาน",
  "วันที่เริ่มข้อตกลง",
  "วันที่เผยแพร่",
])
const numberFields = new Set(["การเข้าถึง", "การมีส่วนร่วม", "การคลิก"])
const optionalFields = new Set([
  "วันที่รับบริการ",
  "ผลประเมินก่อนรับบริการ (Baseline)",
  "ผลประเมินระหว่างรับบริการ (Midline)",
  "ผลประเมินหลังรับบริการ (Endline)",
  "คะแนนก่อนกิจกรรม",
  "คะแนนหลังกิจกรรม",
  "รหัสหลักฐาน",
  "วันที่เริ่มข้อตกลง",
  "บทบาทในห่วงโซ่คุณค่า",
  "ช่องทางเผยแพร่",
  "แคมเปญที่เกี่ยวข้อง",
  "การเข้าถึง",
  "การมีส่วนร่วม",
  "การคลิก",
  "Landing URL",
])
const selectOptions: Record<string, ReadonlyArray<string>> = {
  ช่วงอายุ: ["50–59 ปี", "60–69 ปี", "70–79 ปี", "80 ปีขึ้นไป"],
  ความยินยอมใช้ข้อมูล: ["ให้ความยินยอม", "ไม่ให้ความยินยอม"],
  ประเภท: ["ผลิตภัณฑ์", "บริการ", "บริการสุขภาพ", "ฝึกอาชีพ"],
  การดำเนินการหลัก: ["ขอรับบริการ", "สั่งซื้อ", "สอบถาม"],
  ประเภทข้อตกลง: ["MOU", "MOA", "Informal"],
  ประเภทนวัตกรรม: ["เทคโนโลยี", "ธุรกิจหรือระบบ"],
  ระยะการนำไปใช้: ["ต้นแบบ", "ทดลองใช้", "นำไปใช้แล้ว"],
  ประเภทเนื้อหา: ["องค์ความรู้", "ข่าว", "กิจกรรม", "คู่มือ"],
  บทบาท: ["ผู้ดูแลโครงการ", "ผู้บริหาร (ดูข้อมูลเท่านั้น)"],
  สถานะ: ["เปิดใช้งาน", "รอตรวจสอบ", "ยืนยันแล้ว", "เสร็จสิ้น", "ปิดใช้งาน"],
}

export function AdminRecordFormPage({ id, module }: { id?: string; module: AdminModuleKey }) {
  const config = adminModules[module]
  const record = id ? config.records.find((item) => item.id === id) : undefined
  const title = id ? `แก้ไข${config.singular}` : `เพิ่ม${config.singular}`

  return (
    <>
      <header className="admin-page-header">
        <div>
          <h1>{title}</h1>
          <p>กรอกช่องจำเป็นให้ครบ แล้วตรวจสอบข้อมูลก่อนอนุมัติและบันทึก</p>
        </div>
      </header>
      <form className="admin-record-form">
        <input name="id" type="hidden" value={id || ""} />
        <input name="_intakeId" type="hidden" value="" />
        <div className="admin-form-layout">
          <section className="admin-form-card">
            <h2>รายละเอียดข้อมูล</h2>
            <div className="admin-form-grid">
              {fields[module].map((label, index) =>
                imageLabels.has(label) ? (
                  <div className="admin-field admin-field--image" key={label}>
                    <input name="imageCode" type="hidden" value={record?.imageCode || ""} />
                    <span>รูปภาพ</span>
                    <strong>{record?.imageCode ? "มีรูปภาพแล้ว" : "ยังไม่มีรูปภาพ"}</strong>
                    <small>สามารถเพิ่มไฟล์รูปภาพในภายหลัง</small>
                  </div>
                ) : (
                  <label
                    className={cn("admin-field", fullWidth.has(label) && "admin-field--full")}
                    key={label}
                  >
                    <span>
                      {label} {!optionalFields.has(label) ? <em>จำเป็น</em> : null}
                    </span>
                    {textareas.has(label) ? (
                      <textarea
                        defaultValue={record?.values?.[label] || (index === 0 ? record?.title : "")}
                        required={!optionalFields.has(label)}
                        rows={4}
                      />
                    ) : selectOptions[label] ? (
                      <select
                        defaultValue={
                          label === "สถานะ"
                            ? adminStatusLabels[record?.status || "active"]
                            : record?.values?.[label] || ""
                        }
                        required={!optionalFields.has(label)}
                      >
                        <option value="">เลือก{label}</option>
                        {selectOptions[label].map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        defaultValue={record?.values?.[label] || (index === 0 ? record?.title : "")}
                        required={!optionalFields.has(label)}
                        type={
                          dateFields.has(label)
                            ? "date"
                            : numberFields.has(label)
                              ? "number"
                              : "text"
                        }
                      />
                    )}
                  </label>
                ),
              )}
            </div>
          </section>
          {fields[module].some((label) => imageLabels.has(label)) ? (
            <aside className="admin-image-placeholder">
              <strong>{record?.imageCode ? "มีรูปภาพแล้ว" : "ยังไม่มีรูปภาพ"}</strong>
              <span>{record?.imageCode ? "รูปภาพพร้อมแสดงผล" : "จะเพิ่มรูปภาพในภายหลัง"}</span>
            </aside>
          ) : null}
        </div>
        <div className="admin-form-actions">
          <div>
            <Link href={config.path}>ยกเลิก</Link>
            {id ? (
              <>
                <button className="workspace-button admin-danger" type="button">
                  ปิดใช้งาน
                </button>
                <button className="workspace-button admin-danger" type="button">
                  ลบข้อมูล
                </button>
              </>
            ) : null}
          </div>
          <button className="workspace-button workspace-button--primary" type="submit">
            ตรวจสอบก่อนบันทึก
          </button>
        </div>
      </form>
    </>
  )
}
