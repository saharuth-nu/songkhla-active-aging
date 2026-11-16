# Product Backlog — Songkhla Active Aging Digital Platform

> สถานะ: `[ ]` todo · `[~]` in progress · `[x]` done  
> อัปเดตล่าสุด: 2026-11-16

---

## Milestone 1 — เอกสารและ Requirements
> เกณฑ์: เอกสาร 5 รายการครบ ผ่านการเห็นชอบจากผู้ว่าจ้าง

| # | Task | Label | Issue |
|---|------|-------|-------|
| 1 | [x] จัดทำ Requirement Specification v1 | delivery | — |
| 2 | [x] จัดทำ Sitemap & User Flow v1 | delivery | — |
| 3 | [x] จัดทำ System Architecture & Database Schema v1 | delivery | — |
| 4 | [x] จัดทำ KPI Mapping v1 | delivery | — |
| 5 | [ ] จัดทำเอกสารรายการที่ 5 ⚠️ รอยืนยันจากผู้ว่าจ้าง | delivery | — |
| 6 | [ ] รอยืนยัน Domain / URL จริง | delivery | #2 |
| 7 | [ ] รอยืนยัน ภาษาอังกฤษด้วยหรือไม่ | delivery | #2 |
| 8 | [ ] รอยืนยัน ข้อความ PDPA Consent | security | #2 |
| 9 | [ ] รอยืนยัน โลโก้ / Brand Guideline | delivery | #2 |
| 10 | [ ] รอยืนยัน ฟิลด์ลงทะเบียนผู้ประกอบการ/ภาคี | delivery | #2 |
| 11 | [ ] รอยืนยัน ช่องทางชำระเงิน | delivery | #2 |

---

## Milestone 2 — Demo-ready MVP
> เกณฑ์: ระบบ MVP พร้อม Demo ผ่าน URL สาธิตได้จริง | กำหนด: 20 ก.ย. 2569

### Database
| # | Task | Label | Issue |
|---|------|-------|-------|
| 12 | [ ] สร้าง Drizzle schema ครบ 16 ตาราง | database | #3 |
| 13 | [ ] รัน migration ขึ้น Supabase | database | #3 |
| 14 | [ ] Seed kpi_targets KPI01–KPI12 | database | #3 |

### Frontend — Public Zone
| # | Task | Label | Issue |
|---|------|-------|-------|
| 15 | [ ] หน้า Home `/` — Highlight ผลิตภัณฑ์/ข่าว/KPI | frontend | #4 |
| 16 | [ ] หน้า About `/about` | frontend | #4 |
| 17 | [ ] หน้า Innovation `/innovation` | frontend | #4 |
| 18 | [ ] หน้า Partners `/partners` | frontend | #4 |
| 19 | [ ] หน้า Impact `/impact` — KPI สาธารณะ (สรุปรวม) | frontend | #4 |
| 20 | [ ] หน้า Products `/products` + `/products/[id]` | frontend | #5 |
| 21 | [ ] หน้า Health Services `/health-services` + `[id]` | frontend | #5 |
| 22 | [ ] หน้า Knowledge Hub `/knowledge` + `[id]` | frontend | #5 |
| 23 | [ ] หน้า News `/news` + `[id]` | frontend | #5 |
| 24 | [ ] หน้า Register `/register` + PDPA Consent | frontend | #6 |
| 25 | [ ] หน้า Contact `/contact` | frontend | #6 |
| 26 | [ ] หน้า Campaign Landing Page `/lp/[slug]` | frontend | #6 |

### Frontend — Marketplace
| # | Task | Label | Issue |
|---|------|-------|-------|
| 27 | [ ] หน้า Request Form `/request/new?item=[id]` + PDPA | frontend | #7 |
| 28 | [ ] หน้า Confirm Request `/request/confirm` + แนบหลักฐาน | frontend | #7 |
| 29 | [ ] หน้า Tracking `/request/[code]` — ไม่ต้อง Login | frontend | #7 |

### Admin Panel — Core
| # | Task | Label | Issue |
|---|------|-------|-------|
| 30 | [ ] Admin Login `/admin/login` (Supabase Auth) | admin-panel | #9 |
| 31 | [ ] Auth Guard — requireAdmin / withAdmin middleware | admin-panel | #9 |
| 32 | [ ] Redirect ถ้ายังไม่ Login | security | #9 |
| 33 | [ ] Admin Dashboard KPI `/admin/dashboard` — KPI 12 ตัว | admin-panel | #8 |
| 34 | [ ] KPI Status badge: achieved / on_track / needs_attention | dashboard | #8 |
| 35 | [ ] กรอง KPI ตาม dateFrom / dateTo / area | dashboard | #8 |
| 36 | [ ] Admin Products CRUD `/admin/products` | admin-panel | #10 |
| 37 | [ ] Admin Transactions List `/admin/transactions` | admin-panel | #11 |
| 38 | [ ] Admin Transaction Detail — ปรับสถานะ + admin_note | admin-panel | #11 |
| 39 | [ ] บันทึก value_chain เมื่อ Transaction = completed | backend | #11 |

### Analytics
| # | Task | Label | Issue |
|---|------|-------|-------|
| 40 | [ ] อ่าน UTM params จาก URL ทุกหน้า | analytics | #12 |
| 41 | [ ] บันทึก analytics_events (pageview / click / form_submit / order) | analytics | #12 |
| 42 | [ ] IP hash SHA-256 ย่อ 16 chars (PDPA) | security | #12 |
| 43 | [ ] ผูก utm_source/utm_campaign ติดไปกับ Transaction | analytics | #12 |

---

## Milestone 3 — Production Release
> เกณฑ์: Production ครบ UAT, Source Code, คู่มือ, อบรม | กำหนด: วันที่ 55

### Admin Panel — ทุกหมวด
| # | Task | Label | Issue |
|---|------|-------|-------|
| 44 | [ ] Admin Beneficiaries CRUD `/admin/beneficiaries` | admin-panel | #13 |
| 45 | [ ] Auto-generate beneficiary_code (BNF-XXXXXXXX) | backend | #13 |
| 46 | [ ] Admin Training CRUD `/admin/training` | admin-panel | #14 |
| 47 | [ ] Admin Tech Transfer CRUD `/admin/tech-transfer` | admin-panel | #15 |
| 48 | [ ] Admin Employment CRUD `/admin/employment` | admin-panel | #16 |
| 49 | [ ] Admin Partners CRUD `/admin/partners` | admin-panel | #17 |
| 50 | [ ] Admin Innovations CRUD `/admin/innovations` | admin-panel | #18 |
| 51 | [ ] Admin Knowledge CRUD `/admin/knowledge` + publish/unpublish | admin-panel | #19 |
| 52 | [ ] Admin Landing Pages CRUD + UTM Builder + copy URL | admin-panel | #20 |
| 53 | [ ] Admin Contact Inquiries — ดู + เปลี่ยนสถานะ | admin-panel | #21 |
| 54 | [ ] Admin KPI Manual Input (KPI12 + อื่นๆ) | admin-panel | #22 |
| 55 | [ ] Admin KPI Targets — แก้ไข target_value | dashboard | #22 |
| 56 | [ ] Admin Users CRUD + Role Management | admin-panel | #23 |

### Dashboards
| # | Task | Label | Issue |
|---|------|-------|-------|
| 57 | [ ] Area Dashboard `/admin/dashboard/area` | dashboard | #24 |
| 58 | [ ] Business Dashboard `/admin/dashboard/business` — Transaction/รายได้/Value Chain % | dashboard | #25 |
| 59 | [ ] PR/Engagement Dashboard `/admin/dashboard/pr` | dashboard | #26 |

### Import / Export
| # | Task | Label | Issue |
|---|------|-------|-------|
| 60 | [ ] Export CSV — Beneficiaries, Transactions, Trainings | admin-panel | #27 |
| 61 | [ ] Import CSV Template — Beneficiary | backend | #27 |
| 62 | [ ] Import CSV Template — Product/Service | backend | #27 |
| 63 | [ ] Validate CSV + แสดง Error ก่อน confirm | backend | #27 |

### Analytics & Production
| # | Task | Label | Issue |
|---|------|-------|-------|
| 64 | [ ] ติดตั้ง Google Analytics 4 (รอ Measurement ID จากผู้ว่าจ้าง) | analytics | #28 |
| 65 | [ ] Deploy Production — Vercel + Custom Domain + HTTPS | delivery | #30 |
| 66 | [ ] Environment Variables (.env.production) | delivery | #30 |
| 67 | [ ] Database Backup/Restore procedure | database | #30 |
| 68 | [ ] UAT — แก้ไข Critical/Major Bug จนผู้ว่าจ้างยอมรับ | delivery | — |

### เอกสารส่งมอบ
| # | Task | Label | Issue |
|---|------|-------|-------|
| 69 | [ ] User Manual ภาษาไทย (PDF/Word) | delivery | #29 |
| 70 | [ ] Admin Manual ภาษาไทย (PDF/Word) | delivery | #29 |
| 71 | [ ] อบรมการใช้งาน ≥ 2 ชั่วโมง ⚠️ รอยืนยัน Onsite/Online + วันที่ | delivery | — |

---

## สรุป Progress

| Milestone | Tasks | Done | Remaining |
|-----------|-------|------|-----------|
| M1 — เอกสาร | 11 | 4 | 7 |
| M2 — Demo MVP | 32 | 0 | 32 |
| M3 — Production | 28 | 0 | 28 |
| **รวม** | **71** | **4** | **67** |
