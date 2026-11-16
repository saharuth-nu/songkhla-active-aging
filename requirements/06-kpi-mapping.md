# KPI Mapping

## หลักการ

KPI/ผลผลิต 12 ตัวของโครงการ แบ่งการคำนวณ Actual เป็น 2 ประเภท:
- **Auto** — ระบบคำนวณจากข้อมูลในฐานข้อมูลโดยตรง
- **Manual** — Admin กรอกค่าผ่าน Admin Panel (ตาราง kpi_manual_inputs)

---

## ตาราง KPI ครบ 12 ตัว

| # | KPI / ผลผลิต | Target | หน่วย | ตารางหลัก | ประเภท |
|---|-------------|--------|-------|----------|--------|
| KPI01 | วิสาหกิจ/กลไกธุรกิจบริการสุขภาพเพื่อสังคม | 1 | แห่ง | partners | Auto |
| KPI02 | ผู้ประกอบการ/บุคลากรสุขภาพชุมชนที่ได้รับการพัฒนา | 10 | คน | trainings | Auto |
| KPI03 | ผู้ได้รับการถ่ายทอดนวัตกรรมสุขภาพ | 20 | คน | tech_transfers | Auto |
| KPI04 | ผลิตภัณฑ์/บริการสุขภาพชุมชน | 5 | รายการ | product_services | Auto |
| KPI05 | การหมุนเวียน/กระจายรายได้ในห่วงโซ่คุณค่า | 15 | % | value_chains + transactions | Auto |
| KPI06 | การจ้างงานในระบบบริการสุขภาพชุมชน | 30 | คน | employments | Auto |
| KPI07 | ประชาชนเข้าถึงบริการสุขภาพเพิ่มขึ้น | 30 | คน | beneficiaries | Auto |
| KPI08 | เครือข่ายความร่วมมือ | 2 | เครือข่าย | partners | Auto |
| KPI09 | นวัตกรรม/เทคโนโลยีเพื่อยกระดับ Value Chain | 2 | นวัตกรรม | innovations | Auto |
| KPI10 | นวัตกรรมระบบ/การจัดการธุรกิจสุขภาพ | 2 | นวัตกรรม | innovations | Auto |
| KPI11 | คู่มือ/องค์ความรู้ด้านสุขภาพชุมชน | 4 | ชุด | knowledge_contents | Auto |
| KPI12 | ระบบฐานข้อมูล/แพลตฟอร์มดิจิทัล | 1 | ระบบ | kpi_manual_inputs | Manual |

---

## SQL คำนวณ Actual แต่ละ KPI

**KPI01** — `COUNT(*) WHERE partner_type = 'SE' AND is_active = TRUE` (partners)

**KPI02** — `COUNT(DISTINCT participant_code) WHERE participant_type IN ('entrepreneur','health_personnel')` (trainings)

**KPI03** — `COUNT(DISTINCT participant_code)` (tech_transfers)

**KPI04** — `COUNT(*) WHERE is_active = TRUE` (product_services)

**KPI05** — `SUM(community_income) / NULLIF(SUM(amount),0) * 100 WHERE t.status='completed'` (value_chains JOIN transactions)

**KPI06** — `COUNT(DISTINCT person_code) WHERE is_active = TRUE` (employments)

**KPI07** — `COUNT(DISTINCT id) WHERE service_received IS NOT NULL` (beneficiaries)

**KPI08** — `COUNT(DISTINCT network_name) WHERE is_active = TRUE AND network_name IS NOT NULL` (partners)

**KPI09** — `COUNT(*) WHERE innovation_type = 'technology'` (innovations)

**KPI10** — `COUNT(*) WHERE innovation_type = 'business_system'` (innovations)

**KPI11** — `COUNT(*) WHERE content_type = 'manual' AND is_published = TRUE` (knowledge_contents)

**KPI12** — Admin กรอก actual_value = 1 เมื่อระบบเปิดใช้งาน Production

---

## Dashboard Display Logic

| ฟิลด์ | การคำนวณ |
|-------|---------|
| **Target** | ดึงจาก `kpi_targets.target_value` |
| **Actual** | คำนวณจาก SQL ด้านบน หรือดึงจาก `kpi_manual_inputs` |
| **Progress (%)** | `(Actual / Target) * 100` |
| **Status** | `≥ 100%` → ✅ บรรลุ / `≥ 70%` → 🟡 กำลังดำเนินการ / `< 70%` → 🔴 ต้องเร่งรัด |

---

## การกรองข้อมูลบน Dashboard

API รองรับ query parameters:

```
GET /api/kpi?area=สงขลา&dateFrom=2025-01-01&dateTo=2025-12-31
GET /api/dashboard/business?area=หาดใหญ่&dateFrom=2025-01-01&dateTo=2025-06-30
```

| Parameter | ประเภท | คำอธิบาย |
|-----------|--------|---------|
| `area` | string | กรองตามพื้นที่ |
| `dateFrom` | YYYY-MM-DD | กรองตั้งแต่วันที่ |
| `dateTo` | YYYY-MM-DD | กรองถึงวันที่ |

> Dashboard คำนวณค่า Actual ผ่าน API โดยตรง (ไม่ใช้ SQL View) เพื่อรองรับ dynamic filtering
