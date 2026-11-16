# Technical Requirements

## Tech Stack

| Layer | Technology | เหตุผล |
|-------|-----------|--------|
| Frontend | Next.js 15.3 (App Router) | SSR/SSG ช่วย SEO, Responsive, รองรับ Thai Unicode |
| Backend | Next.js API Routes | ไม่ต้องแยก Server, MVP เบา, deploy ง่าย |
| Database | PostgreSQL (via Supabase) | ตรงตาม TOR, Export CSV, รองรับ Unicode ภาษาไทย |
| ORM | Drizzle ORM + postgres | Type-safe, Transaction Pooler port 6543 (`prepare: false`) |
| Styling | Tailwind CSS | Responsive รวดเร็ว |
| Auth | Supabase Auth (@supabase/ssr) | Session via HTTP-only cookie, Role ใน users table |
| Analytics | Custom analytics_events + UTM | ติดตาม Campaign/Source/Referral ตาม TOR, IP hash (PDPA) |
| ID Generator | nanoid (prefix + 8 chars uppercase) | เช่น `BNF-A3B7X9QM`, `PRD-XXXXXXXX` |

> **หมายเหตุ:** เปลี่ยนจาก Prisma → Drizzle ORM และ NextAuth → Supabase Auth เพื่อรองรับ Supabase Transaction Pooler (port 6543) ซึ่งต้องการ `prepare: false`

---

## Deployment Architecture

| ส่วน | ตัวเลือก MVP | หมายเหตุ |
|------|------------|----------|
| Hosting | Vercel (Free Tier) หรือ VPS | Vercel เหมาะ MVP, ย้าย VPS ได้ทีหลัง |
| Database | Supabase (Free Tier) | มี Dashboard, Backup, Auth พร้อม |
| Domain + HTTPS | Custom Domain + Auto SSL | Let's Encrypt / Vercel SSL |

**ข้อจำกัด Free Tier:**
- **Vercel Free:** Bandwidth 100GB/เดือน, Build 6,000 นาที/เดือน
- **Supabase Free:** DB 500MB, 50,000 MAU, หยุด Project หากไม่ใช้ 7 วัน

---

## Non-Functional Requirements

| รายการ | ข้อกำหนด |
|--------|---------|
| **Responsive** | Desktop / Tablet / Mobile |
| **ภาษา** | ภาษาไทย + Unicode |
| **HTTPS** | บังคับใช้ใน Production |
| **Password** | bcrypt / argon2 (hash only, no plain text) |
| **Portability** | ย้าย Custom Domain / Hosting ได้โดยไม่พัฒนาใหม่ |

---

## Security & PDPA

- ข้อมูลส่วนบุคคลและข้อมูลสุขภาพรายบุคคลไม่แสดงบน Public โดยตรง
- Public Dashboard ใช้ข้อมูลสรุปรวม หรือรหัสแทนบุคคล (beneficiary_code)
- แบบฟอร์มลงทะเบียนมีข้อความแจ้งวัตถุประสงค์และรับ Consent ⚠️ รอข้อความจริงจากผู้ว่าจ้าง
- Role-based Access Control: Admin เข้าถึงทุกส่วน / Viewer เข้าถึงเฉพาะ Dashboard
- ระบบมีวิธี Backup และ Restore ฐานข้อมูล
- IP Address เก็บในรูป SHA-256 ย่อ 16 chars (analytics_events) เพื่อ PDPA

---

## Project Structure

```
songkhla-active-aging/
├── src/
│   ├── app/
│   │   ├── (public)/               # Public Zone
│   │   │   ├── page.tsx            # Home / Landing
│   │   │   ├── about/
│   │   │   ├── innovation/
│   │   │   ├── products/
│   │   │   ├── health-services/
│   │   │   ├── knowledge/
│   │   │   ├── news/
│   │   │   ├── impact/             # KPI Public View
│   │   │   ├── partners/
│   │   │   ├── register/
│   │   │   ├── contact/
│   │   │   ├── request/
│   │   │   └── lp/[slug]/          # Campaign Landing Page
│   │   ├── (admin)/                # Admin Zone
│   │   │   ├── login/
│   │   │   ├── dashboard/
│   │   │   ├── beneficiaries/
│   │   │   ├── products/
│   │   │   ├── transactions/
│   │   │   ├── training/
│   │   │   ├── tech-transfer/
│   │   │   ├── employment/
│   │   │   ├── partners/
│   │   │   ├── innovations/
│   │   │   ├── knowledge/
│   │   │   ├── landing-pages/
│   │   │   ├── contact/
│   │   │   ├── kpi/
│   │   │   ├── import-export/
│   │   │   └── users/
│   │   └── api/                    # API Routes (Backend)
│   │       ├── auth/
│   │       ├── users/
│   │       ├── beneficiaries/
│   │       ├── products/
│   │       ├── transactions/
│   │       ├── training/
│   │       ├── tech-transfer/
│   │       ├── employment/
│   │       ├── partners/
│   │       ├── innovations/
│   │       ├── knowledge/
│   │       ├── landing-pages/
│   │       ├── contact/
│   │       ├── kpi/
│   │       ├── dashboard/
│   │       ├── import-export/
│   │       ├── analytics/
│   │       ├── register/
│   │       ├── request/
│   │       └── public/
│   ├── lib/
│   │   ├── db/
│   │   │   ├── index.ts            # Drizzle Client
│   │   │   └── schema.ts           # Database Schema
│   │   ├── auth/
│   │   │   └── guard.ts            # getAuthUser / requireAdmin / withAdmin
│   │   └── utils/
│   │       └── nanoid.ts           # ID Generator
│   └── utils/
│       └── supabase/
│           ├── client.ts
│           ├── server.ts
│           └── admin.ts
├── drizzle/                        # SQL Migration files
│   ├── seed-kpi-targets.sql
│   └── add-landing-pages-contacts.sql
└── postman/
    └── songkhla-active-aging.postman_collection.json
```
