# Sitemap & User Flow

## Sitemap

### Public Zone (ไม่ต้อง Login)

```
/ (Home / Landing Page)
├── /about
├── /innovation
├── /products
│   └── /products/[id]
├── /health-services
│   └── /health-services/[id]
├── /knowledge
│   └── /knowledge/[id]
├── /news
│   └── /news/[id]
├── /impact
├── /partners
├── /register
├── /contact
└── /lp/[campaign-slug]
```

### Marketplace / Request Zone (ไม่ต้อง Login)

```
/products/[id]
├── ปุ่ม "สนใจ / ขอรับบริการ / สั่งซื้อ"
│   └── /request/new?item=[id]
│       └── /request/confirm
└── /request/[code]        — ติดตามสถานะ
```

### Admin Zone (ต้อง Login)

```
/admin
├── /admin/login
├── /admin/dashboard
│   ├── /admin/dashboard/area
│   ├── /admin/dashboard/business
│   └── /admin/dashboard/pr
├── /admin/beneficiaries
├── /admin/products
├── /admin/transactions
├── /admin/training
├── /admin/tech-transfer
├── /admin/employment
├── /admin/partners
├── /admin/innovations
├── /admin/knowledge
├── /admin/landing-pages
├── /admin/contact
├── /admin/kpi
├── /admin/import-export
└── /admin/users
```

---

## User Flows

### Flow 1 — ประชาชนทั่วไป เข้าถึงข้อมูลโครงการ

```
เข้าจาก Facebook / Hatyai Connext / QR Code / Search
    │ (พร้อม UTM Parameter)
    ▼
Landing Page (/)
    ├──► About / Innovation / Knowledge / News / Partners / Impact
    └──► Products & Services → รายละเอียดสินค้า → Flow 2
```

### Flow 2 — ผู้สูงอายุ/ผู้รับบริการ ส่งคำขอรับบริการ

```
/products/[id] → กดปุ่ม "สนใจ / ขอรับบริการ / สั่งซื้อ"
    ▼
/request/new?item=[id]  — กรอกชื่อ, เบอร์, จำนวน, พื้นที่ + PDPA Consent
    ▼
/request/confirm  — ยืนยันคำขอ, แนบหลักฐานชำระเงิน
    ▼
ระบบบันทึก Transaction (status = 'pending') พร้อม utm_campaign
    ▼
หน้าสำเร็จ — แสดง Request Code → /request/[code]
```

### Flow 3 — ผู้รับบริการ ลงทะเบียน

```
Landing Page หรือ QR Code
    ▼
/register — กรอกพื้นที่, กลุ่มอายุ, บริการที่สนใจ + PDPA Consent
    ▼
ระบบบันทึก Beneficiary (พร้อม beneficiary_code)
    ▼
หน้าสำเร็จ
```

### Flow 4 — Admin จัดการ Product/Service Catalog

```
/admin/login → /admin/dashboard → /admin/products
    ├──► เพิ่มรายการใหม่ → /admin/products/new → บันทึก
    └──► แก้ไข → /admin/products/[id] → แก้ไข / ปิดใช้งาน / ลบ
```

### Flow 5 — Admin จัดการ Transaction

```
/admin/transactions — กรองตาม สถานะ / วันที่ / พื้นที่
    ▼ คลิกรายการ
/admin/transactions/[id] — ดูรายละเอียด, ปรับสถานะ
    ├──► pending → confirmed
    ├──► confirmed → completed (บันทึก value_chain)
    └──► pending/confirmed → cancelled
```

### Flow 6 — Admin ดู KPI Dashboard

```
/admin/dashboard — KPI 12 ตัว, กรองช่วงเวลา/พื้นที่
    ├──► /admin/dashboard/area
    ├──► /admin/dashboard/business
    └──► /admin/dashboard/pr
```

### Flow 7 — Admin Import/Export ข้อมูล

```
/admin/import-export
    ├──► Export → เลือกชุดข้อมูล + ช่วงเวลา → ดาวน์โหลด CSV
    └──► Import → ดาวน์โหลด Template → กรอกข้อมูล → อัปโหลด → ยืนยัน
```

### Flow 8 — Viewer / Executive ดู Dashboard

```
/admin/login (Role: Viewer)
    ▼
/admin/dashboard — เข้าถึงได้เฉพาะ Dashboard (อ่านอย่างเดียว)
```

### Flow 9 — Admin สร้าง Campaign Landing Page

```
/admin/landing-pages/new
    — กรอก: ชื่อ Campaign, slug, เนื้อหา, UTM Parameters
    ▼
ระบบสร้าง URL: /lp/[campaign-slug]
    ▼
ทีม PR คัดลอก URL ไปใช้ใน Facebook / Hatyai Connext / QR Code
```

---

## UTM / Campaign Tracking Flow

```
Facebook / Hatyai Connext / QR Code
    │ URL: /lp/[slug]?utm_source=facebook&utm_medium=social&utm_campaign=...
    ▼
Landing Page → ระบบบันทึก analytics_events
    (session_id, page_url, utm_source, utm_medium, utm_campaign, event_type='pageview')
    ▼
ผู้ใช้ทำ Action (กดสินค้า / กรอกฟอร์ม / ส่ง Request)
    → บันทึก event_type = 'click' / 'form_submit' / 'order'
    → source และ campaign ติดไปกับ Transaction
    ▼
PR Dashboard แสดง Conversion แยกตาม Campaign / Source
```

---

## Coverage Matrix

### หน้าหลักตาม TOR

| หน้า | Path | ครอบคลุม |
|------|------|---------|
| Home | `/` | ✅ |
| About Project | `/about` | ✅ |
| Innovation | `/innovation` | ✅ |
| Product & Service | `/products`, `/products/[id]` | ✅ |
| Health Services | `/health-services`, `/health-services/[id]` | ✅ |
| Knowledge Hub | `/knowledge`, `/knowledge/[id]` | ✅ |
| News & Activities | `/news`, `/news/[id]` | ✅ |
| Impact/KPI | `/impact` | ✅ |
| Partner Network | `/partners` | ✅ |
| Contact/Registration | `/contact`, `/register` | ✅ |
| Campaign Landing Page | `/lp/[campaign-slug]` | ✅ |

### กลุ่มผู้ใช้

| กลุ่มผู้ใช้ | Flow ที่ครอบคลุม |
|-----------|----------------|
| ประชาชนทั่วไป | Flow 1 |
| ผู้สูงอายุ/ผู้รับบริการ/ผู้ดูแล | Flow 2, 3 |
| ผู้ประกอบการ/ผู้ให้บริการ/ภาคี | ผ่าน Admin |
| Project Admin | Flow 4, 5, 6, 7, 9 |
| Executive/Viewer | Flow 8 |
