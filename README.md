# Songkhla Active Aging Digital Platform

แพลตฟอร์มดิจิทัลสำหรับโครงการ Songkhla Active Aging Model  
พัฒนาตาม TOR: จัดจ้างพัฒนาระบบฐานข้อมูล เว็บไซต์ Web Application และ Dashboard

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Database**: PostgreSQL (via Neon / Drizzle ORM)
- **Auth**: NextAuth v5
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public pages (Home, Products, Knowledge, etc.)
│   ├── (admin)/           # Admin panel (Dashboard, KPI, CRUD)
│   └── api/               # API routes
├── components/
│   ├── ui/                # Base UI components
│   ├── layout/            # Header, Footer, Sidebar
│   ├── dashboard/         # KPI & chart components
│   ├── forms/             # Form components
│   └── marketplace/       # Product/service components
├── lib/
│   ├── db/                # Database schema & queries
│   └── auth/              # Auth config
├── types/                 # TypeScript interfaces (12 data models)
├── constants/             # KPI definitions, enums
└── hooks/                 # Custom React hooks
```

## KPI Coverage (12 KPIs per TOR)

| #   | KPI                           | Target       | Data Source     |
| --- | ----------------------------- | ------------ | --------------- |
| 1   | วิสาหกิจ/กลไกธุรกิจ           | ≥1 แห่ง      | partner         |
| 2   | ผู้ประกอบการที่ได้รับการพัฒนา | ≥10 คน       | training        |
| 3   | ผู้รับการถ่ายทอดนวัตกรรม      | ≥20 คน       | tech_transfer   |
| 4   | ผลิตภัณฑ์/บริการ              | ≥5 รายการ    | product_service |
| 5   | การกระจายรายได้ Value Chain   | ≥15%         | value_chain     |
| 6   | การจ้างงาน                    | ≥30 คน       | employment      |
| 7   | ประชาชนเข้าถึงบริการ          | ≥30 คน       | beneficiary     |
| 8   | เครือข่ายความร่วมมือ          | ≥2 เครือข่าย | partner         |
| 9   | นวัตกรรม Value Chain          | ≥2 นวัตกรรม  | innovation      |
| 10  | นวัตกรรมระบบธุรกิจ            | ≥2 นวัตกรรม  | innovation      |
| 11  | คู่มือ/องค์ความรู้            | ≥4 ชุด       | knowledge       |
| 12  | ระบบดิจิทัล                   | ≥1 ระบบ      | system          |

## Getting Started

```bash
npm install
npm run dev
```

## Deliverables per TOR

- [x] งวด 1: System Design, DB Schema, KPI Mapping, Wireframe
- [ ] งวด 2: Demo-ready MVP (by Sep 20, 2026)
- [ ] งวด 3: Full system, UAT, Training, Handover
