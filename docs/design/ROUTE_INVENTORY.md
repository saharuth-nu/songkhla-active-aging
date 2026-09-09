# Hi-fi v0.1.0 Route Inventory

Status: Canonical  
Source: `prototype_songkhla_active/hi-fi/v0.1.0/scripts/router.js`

## Route mapping rule

The prototype server adds `/hi-fi` as a hosting base path. The Next.js application uses the same clean URLs with only that prototype prefix removed.

| Prototype                | Next.js target     |
| ------------------------ | ------------------ |
| `/hi-fi/`                | `/`                |
| `/hi-fi/products`        | `/products`        |
| `/hi-fi/admin/dashboard` | `/admin/dashboard` |

No other route, parameter, query, or navigation change is allowed without an approved decision record.

## H10–H11 Public Zone

| Route name         | Target route      | Page                     | Phase |
| ------------------ | ----------------- | ------------------------ | ----- |
| `home`             | `/`               | หน้าหลัก                 | H10   |
| `about`            | `/about`          | เกี่ยวกับโครงการ         | H11   |
| `innovation`       | `/innovation`     | นวัตกรรม                 | H11   |
| `knowledge`        | `/knowledge`      | องค์ความรู้              | H11   |
| `knowledge-detail` | `/knowledge/[id]` | รายละเอียดองค์ความรู้    | H11   |
| `news`             | `/news`           | ข่าวและกิจกรรม           | H11   |
| `news-detail`      | `/news/[id]`      | รายละเอียดข่าวและกิจกรรม | H11   |
| `impact`           | `/impact`         | ผลลัพธ์โครงการ           | H11   |
| `partners`         | `/partners`       | ภาคีเครือข่าย            | H11   |
| `contact`          | `/contact`        | ติดต่อโครงการ            | H11   |
| `privacy`          | `/privacy`        | ประกาศความเป็นส่วนตัว    | H11   |
| `terms`            | `/terms`          | เงื่อนไขการใช้งาน        | H11   |
| `accessibility`    | `/accessibility`  | การช่วยการเข้าถึง        | H11   |

Public header order is fixed: หน้าหลัก, เกี่ยวกับโครงการ, สินค้าและบริการ, นวัตกรรม, องค์ความรู้, ข่าวและกิจกรรม, ผลลัพธ์. Header actions are fixed to ติดต่อโครงการ and ลงทะเบียน. Partners remains a footer-level entry.

## H12 Marketplace

| Route name        | Target route       | Page                      | Phase |
| ----------------- | ------------------ | ------------------------- | ----- |
| `products`        | `/products`        | สินค้าและบริการ           | H12   |
| `product-detail`  | `/products/[id]`   | รายละเอียดสินค้าและบริการ | H12   |
| `health-services` | `/health-services` | Marketplace health preset | H12   |

Canonical Marketplace queries include `q`, multi-value `type`, `area`, `minPrice`, `maxPrice`, `sort`, and `view`. Request/order/contact handoff queries must match the prototype.

## H13 Registration and Request

| Route name         | Target route        | Page                     | Phase |
| ------------------ | ------------------- | ------------------------ | ----- |
| `register`         | `/register`         | ลงทะเบียนรับบริการ       | H13   |
| `register-success` | `/register/success` | ลงทะเบียนสำเร็จ          | H13   |
| `request-lookup`   | `/request`          | ติดตามสถานะคำขอ          | H13   |
| `request-entry`    | `/request/start`    | จุดตัดสินใจก่อนสร้างคำขอ | H13   |
| `request-new`      | `/request/new`      | สร้างคำขอ/คำสั่งซื้อ     | H13   |
| `request-confirm`  | `/request/confirm`  | ตรวจสอบคำขอ              | H13   |
| `request-success`  | `/request/success`  | ส่งคำขอสำเร็จ            | H13   |
| `request-status`   | `/request/[code]`   | สถานะและ Timeline        | H13   |

Request routes preserve `item`, `intent`, `source`, `campaign`, and the five documented UTM values when present.

## H14 Campaign

| Route name | Target route     | Page                  | Phase |
| ---------- | ---------------- | --------------------- | ----- |
| `campaign` | `/lp/[campaign]` | Campaign Landing Page | H14   |

The canonical campaign is `active-aging-2569`. Unknown campaign values render the designed not-found state.

## H16 Workspace Access and System

| Route name            | Target route                      | Page                          | Phase   |
| --------------------- | --------------------------------- | ----------------------------- | ------- |
| `login`               | `/login`                          | เลือกบทบาทและเข้าสู่ระบบจำลอง | H16     |
| `permission`          | `/permission`                     | ไม่มีสิทธิ์เข้าถึง            | H16     |
| generated `not-found` | unmatched route / `not-found.tsx` | ไม่พบหน้าที่ต้องการ           | H10/H16 |

Mock accounts are fixed to `admin / demo` and `viewer / demo`.

## H17 Admin Master Data

| Route name            | Target route                  | Page               | Phase |
| --------------------- | ----------------------------- | ------------------ | ----- |
| `admin-module`        | `/admin/data/[module]`        | List/Search/Filter | H17   |
| `admin-module-new`    | `/admin/data/[module]/new`    | Create form        | H17   |
| `admin-module-review` | `/admin/data/[module]/review` | Review before save | H17   |
| `admin-module-edit`   | `/admin/data/[module]/[id]`   | View/Edit record   | H17   |

Approved modules:

| Module parameter | Module              | Internal reference |
| ---------------- | ------------------- | ------------------ |
| `beneficiaries`  | ผู้รับบริการ        | ADM-03             |
| `services`       | สินค้าและบริการ     | ADM-04             |
| `trainings`      | การพัฒนาศักยภาพ     | ADM-07             |
| `tech-transfer`  | การถ่ายทอดเทคโนโลยี | ADM-08             |
| `employments`    | การจ้างงาน          | ADM-09             |
| `partners`       | ภาคีเครือข่าย       | ADM-10             |
| `innovations`    | นวัตกรรม            | ADM-11             |
| `content`        | จัดการเนื้อหา       | ADM-12             |
| `users`          | ผู้ใช้และสิทธิ์     | ADM-15             |

No other module parameter may render a generic substitute. It must show the designed invalid-module state.

## H18 Admin Operations

| Route name                    | Target route                   | Page                 | Phase |
| ----------------------------- | ------------------------------ | -------------------- | ----- |
| `admin-import-export`         | `/admin/import-export`         | นำเข้า/ส่งออกจำลอง   | H18   |
| `admin-campaigns`             | `/admin/campaigns`             | รายการแคมเปญ         | H18   |
| `admin-campaign-new`          | `/admin/campaigns/new`         | สร้างแคมเปญ          | H18   |
| `admin-campaign-review`       | `/admin/campaigns/review`      | ตรวจสอบแคมเปญ        | H18   |
| `admin-campaign-edit`         | `/admin/campaigns/[id]`        | แก้ไขแคมเปญ          | H18   |
| `admin-transactions`          | `/admin/transactions`          | คำขอและธุรกรรม       | H18   |
| `admin-transaction-detail`    | `/admin/transactions/[id]`     | รายละเอียดธุรกรรม    | H18   |
| `admin-partner-intake`        | `/admin/partner-intake`        | รับข้อมูลจากภาคี     | H18   |
| `admin-partner-intake-review` | `/admin/partner-intake/review` | ตรวจสอบข้อมูลจากภาคี | H18   |

## H19 Admin KPI and Dashboards

| Route name                 | Target route                | Page                    | Phase |
| -------------------------- | --------------------------- | ----------------------- | ----- |
| `admin-kpi`                | `/admin/kpi`                | จัดการ KPI01–KPI12      | H19   |
| `admin-dashboard`          | `/admin/dashboard`          | DSH-01 ภาพรวมโครงการ    | H19   |
| `admin-dashboard-area`     | `/admin/dashboard/area`     | DSH-02 รายพื้นที่       | H19   |
| `admin-dashboard-business` | `/admin/dashboard/business` | DSH-03 ธุรกรรมและรายได้ | H19   |
| `admin-dashboard-pr`       | `/admin/dashboard/pr`       | DSH-04 ประชาสัมพันธ์    | H19   |

KPI01–KPI11 derive from canonical mock source records. KPI12 is the only manually editable KPI.

## H20 Viewer Dashboards

| Route name                  | Target route                 | Page                    | Phase |
| --------------------------- | ---------------------------- | ----------------------- | ----- |
| `viewer-dashboard`          | `/viewer/dashboard`          | DSH-01 ภาพรวมโครงการ    | H20   |
| `viewer-dashboard-area`     | `/viewer/dashboard/area`     | DSH-02 รายพื้นที่       | H20   |
| `viewer-dashboard-business` | `/viewer/dashboard/business` | DSH-03 ธุรกรรมและรายได้ | H20   |
| `viewer-dashboard-pr`       | `/viewer/dashboard/pr`       | DSH-04 ประชาสัมพันธ์    | H20   |

Viewer routes use the same reporting definitions and mock dataset as Admin, expose filters, and contain no data-management action or Admin navigation.

## Inventory invariants

- There are 50 canonical route patterns in the prototype router, plus its generated not-found state.
- Dynamic Admin Master Data patterns apply only to the nine approved modules.
- Route specificity must preserve `new` and `review` before the generic `[id]` route.
- `/health-services` is a preset view of the Marketplace dataset, not a separate product domain.
- Public Impact and DSH-04 expose aggregate mock data only.
- Admin and Viewer routes reject the wrong mock role in both directions.
