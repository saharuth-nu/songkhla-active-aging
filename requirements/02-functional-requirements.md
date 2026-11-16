# Functional Requirements

## 4.1 เว็บไซต์ / Public Zone

| หน้า | Path | ฟังก์ชัน |
|------|------|---------|
| Home | `/` | แสดงข้อมูลโครงการ, Highlight ผลิตภัณฑ์/ข่าว/KPI |
| About | `/about` | รายละเอียดโครงการและเป้าหมาย |
| Innovation | `/innovation` | แสดงนวัตกรรมของโครงการ |
| Products & Services | `/products`, `/products/[id]` | Catalog + ปุ่มสนใจ/สั่งซื้อ/ขอรับบริการ |
| Health Services | `/health-services`, `/health-services/[id]` | บริการสุขภาพชุมชน |
| Knowledge Hub | `/knowledge`, `/knowledge/[id]` | คู่มือ/บทความ/สื่อความรู้ |
| News & Activities | `/news`, `/news/[id]` | ข่าวและกิจกรรม |
| Impact / KPI | `/impact` | KPI สาธารณะ (ข้อมูลสรุปรวม ไม่เปิดเผยรายบุคคล) |
| Partner Network | `/partners` | เครือข่ายความร่วมมือ |
| Register | `/register` | ลงทะเบียนผู้รับบริการ พร้อม PDPA Consent |
| Contact | `/contact` | ส่งคำถาม/ติดต่อทีมโครงการ |
| Campaign Landing Page | `/lp/[campaign-slug]` | Landing Page สำหรับ PR Campaign |

**ข้อกำหนด Public Zone:**
- Responsive Design รองรับ Desktop / Tablet / Mobile
- รองรับการแสดงผลภาษาไทยและ Unicode ได้ถูกต้อง
- ใช้ HTTPS ใน Production
- ระบบต้องสามารถย้ายไปใช้ Custom Domain หรือ Hosting อื่นในอนาคตได้โดยไม่ต้องพัฒนาใหม่

---

## 4.2 Marketplace / Request Zone

- แสดงรายการผลิตภัณฑ์/บริการไม่น้อยกว่า 5 รายการ
- หน้ารายละเอียดสินค้า/บริการพร้อมปุ่มสนใจ / สั่งซื้อ / ขอรับบริการ / ติดต่อ
- รองรับ Cart หรือ Request List ขั้นพื้นฐาน
- แบบฟอร์มคำขอรองรับ PDPA Consent พร้อมการแนบหลักฐานการชำระเงิน
- รองรับการระบุวิธีชำระเงินหรือเชื่อมต่อช่องทางภายนอกตามที่ผู้ว่าจ้างกำหนด ⚠️ รอยืนยัน
- บันทึก Transaction พร้อม status: `pending` / `confirmed` / `completed` / `cancelled`
- ผู้ร้องขอติดตามสถานะได้ผ่าน Request Code โดยไม่ต้อง Login
- บันทึก source และ utm_campaign ติดมากับ Transaction เพื่อวิเคราะห์ Conversion

**ไม่รวมในขอบเขต MVP:** Payment Gateway เต็มรูปแบบ, ระบบบัญชี, คลังสินค้า, โลจิสติกส์, ระบบภาษี

---

## 4.3 ระบบลงทะเบียนและข้อมูลผู้ใช้งาน

รองรับแบบฟอร์มลงทะเบียนสำหรับผู้ใช้งานอย่างน้อย 3 ประเภท:

**ผู้รับบริการ / ผู้สูงอายุ / ผู้ดูแล**
- ฟิลด์: พื้นที่, กลุ่มอายุ, ประเภทผู้รับบริการ, บริการที่สนใจ, เบอร์ติดต่อ (optional)
- ระบบกำหนด `beneficiary_code` อัตโนมัติ

**ผู้ประกอบการ / บุคลากรสุขภาพ / ภาคีเครือข่าย**
- ฟิลด์: ⚠️ รอผู้ว่าจ้างกำหนดรายละเอียด

**ข้อกำหนดร่วม:**
- ทุกแบบฟอร์มต้องมีข้อความ PDPA Consent และการให้ความยินยอม ⚠️ รอข้อความจริงจากผู้ว่าจ้าง

---

## 4.4 Dashboard

| Dashboard | เนื้อหา |
|-----------|--------|
| **Project KPI** | KPI 12 ตัว — Target / Actual / Progress% / Status |
| **Area** | ผลลัพธ์แยกตามพื้นที่/ตำบล/อำเภอ |
| **Business / Transaction** | ยอดคำขอ, รายได้, Value Chain % |
| **PR / Engagement** | Reach, Engagement, Click, Campaign Source |

**ข้อกำหนด Dashboard:**
- กรองข้อมูลได้อย่างน้อย 2 เงื่อนไข (ช่วงเวลา / พื้นที่)
- ข้อมูลมาจากฐานข้อมูลหรือไฟล์ที่ Admin นำเข้า ไม่ต้องแก้ Source Code
- Public Dashboard ใช้ข้อมูลสรุปรวม ไม่แสดงข้อมูลระบุตัวบุคคล

---

## 4.5 Admin Panel

- Login พร้อม Role-based Access Control: Admin / Viewer
- Admin จัดการข้อมูลทุกหมวดผ่านหน้าเว็บ (เพิ่ม / แก้ไข / ปิดใช้งาน / ลบ)
- จัดการ KPI Target และ Manual Input
- จัดการ Campaign Landing Page พร้อม UTM Parameter
- สรุปและปรับสถานะ Transaction/Request
- Import ข้อมูลจาก CSV Template (อย่างน้อย Beneficiary และ Product/Service)
- Export ข้อมูลหลักเป็น CSV / Excel-compatible file
- Backup และ Restore ฐานข้อมูล

---

## 4.6 Analytics และ Campaign Tracking

- ติดตั้ง Google Analytics 4 สำหรับติดตาม Page View, Visit/Session, Source/Referral
- รองรับ UTM Parameter: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- บันทึก analytics_events ในฐานข้อมูลเพื่อแสดงผลบน PR Dashboard
- Campaign source ติดไปกับ Transaction เพื่อวิเคราะห์ Conversion แยกตาม Campaign

---

## 4.7 การส่งมอบและหลังส่งมอบ

- ส่งมอบ Source Code / Repository ครบถ้วน
- ส่งมอบ Database Schema และ Database Backup/Export
- ส่งมอบ Configuration / Deployment Instruction ครบถ้วน
- ส่งมอบ Admin Account และบัญชีที่เกี่ยวข้อง
- จัดทำ User Manual / Admin Manual ภาษาไทย รูปแบบ PDF หรือ Word
- อบรมการใช้งานแก่ผู้แทนผู้ว่าจ้างอย่างน้อย 1 ครั้ง ระยะเวลาไม่น้อยกว่า 2 ชั่วโมง ⚠️ รอยืนยัน
- แก้ไขข้อบกพร่อง Critical/Major จาก UAT จนผู้ว่าจ้างยอมรับ
- รับประกันการทำงานของระบบไม่น้อยกว่า 90 วันหลังตรวจรับงวดสุดท้าย

---

## เกณฑ์ตรวจรับ

| งวด | เงื่อนไขหลัก | กำหนด |
|-----|------------|-------|
| **งวดที่ 1** | เอกสาร 5 รายการครบ ผ่านการเห็นชอบจากผู้ว่าจ้าง | วันที่ 7 นับจากวันเริ่มงาน |
| **งวดที่ 2** | Demo-ready MVP พร้อม URL สาธิตได้จริง | วันที่ 20 (สาธิตวันที่ 20 ก.ย. 2569) |
| **งวดที่ 3** | ระบบ Production ครบ UAT, Source Code, คู่มือ, อบรม | วันที่ 55 นับจากวันเริ่มงาน |
