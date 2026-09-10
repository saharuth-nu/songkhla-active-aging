import { AdminReportTabs } from "../components/AdminReportTabs"

const areas = [
  { completed: 14, id: "AREA-01", label: "เมืองสงขลา · บ่อยาง", participants: 38, services: 8 },
  { completed: 18, id: "AREA-02", label: "หาดใหญ่ · คอหงส์", participants: 46, services: 11 },
  { completed: 10, id: "AREA-03", label: "สิงหนคร · หัวเขา", participants: 29, services: 7 },
  { completed: 9, id: "AREA-04", label: "สะเดา · สำนักขาม", participants: 24, services: 6 },
] as const

export function AdminAreaReportView({ viewer = false }: { viewer?: boolean }) {
  return (
    <>
      <ReportHeader
        description="แสดงอำเภอและตำบล พร้อมจำนวนผู้เข้าร่วม บริการ และรายการที่ดำเนินการแล้ว"
        title="เปรียบเทียบผลการดำเนินงานรายพื้นที่"
      />
      {viewer ? <ViewerNotice /> : null}
      <AdminReportTabs
        active={viewer ? "/viewer/dashboard/area" : "/admin/dashboard/area"}
        viewer={viewer}
      />
      <ReportFilter extraLabel="ตัวชี้วัด" />
      <div className="report-summary">
        <Metric label="พื้นที่" meta="อำเภอ · ตำบล" value="4 พื้นที่" />
        <Metric label="ผู้เข้าร่วม" meta="ตามช่วงเวลาที่เลือก" value="137 คน" />
        <Metric label="บริการ" meta="ตามช่วงเวลาที่เลือก" value="32 รายการ" />
      </div>
      <section className="report-panel">
        <h2>ผู้เข้าร่วมตามพื้นที่</h2>
        <Bars items={areas.map((item) => [item.label, item.participants])} />
      </section>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>พื้นที่</th>
              <th>ผู้เข้าร่วม</th>
              <th>บริการ</th>
              <th>เสร็จสิ้น</th>
              <th>อัตราดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            {areas.map((item) => {
              const rate = Math.round((item.completed / item.participants) * 100)
              return (
                <tr key={item.id}>
                  <td>
                    <strong>{item.label}</strong>
                    <small>{item.id}</small>
                  </td>
                  <td>{item.participants}</td>
                  <td>{item.services}</td>
                  <td>{item.completed}</td>
                  <td>
                    <div className="report-progress">
                      <span style={{ width: `${rate}%` }} />
                    </div>
                    <small>
                      {item.label} · {rate}%
                    </small>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export function AdminBusinessReportView({ viewer = false }: { viewer?: boolean }) {
  return (
    <>
      <ReportHeader
        description="คำนวณจากธุรกรรมที่เสร็จสิ้นและข้อมูลการกระจายรายได้"
        title="ภาพรวมธุรกรรมและห่วงโซ่คุณค่า"
      />
      {viewer ? <ViewerNotice /> : null}
      <AdminReportTabs
        active={viewer ? "/viewer/dashboard/business" : "/admin/dashboard/business"}
        viewer={viewer}
      />
      <ReportFilter />
      <div className="report-summary">
        <Metric label="ธุรกรรมทั้งหมด" meta="ตามช่วงเวลาและพื้นที่" value="2 รายการ" />
        <Metric label="มูลค่าที่เสร็จสิ้น" meta="1 รายการ" value="500 บาท" />
        <Metric label="รายได้ชุมชน" meta="KPI05 = 15%" value="75 บาท" />
        <Metric label="ผู้ให้บริการ" meta="ตามรายการที่กรอง" value="2 ราย" />
      </div>
      <div className="report-two-column">
        <section className="report-panel">
          <h2>สถานะธุรกรรม</h2>
          <Bars
            items={[
              ["รอตรวจสอบ", 1],
              ["ยืนยันแล้ว", 0],
              ["เสร็จสิ้น", 1],
              ["ยกเลิก", 0],
            ]}
          />
        </section>
        <section className="report-panel">
          <h2>การกระจายรายได้</h2>
          <Bars
            items={[
              ["ผู้ผลิต", 250],
              ["ผู้ให้บริการ", 125],
              ["ชุมชน", 75],
              ["อื่น ๆ", 50],
            ]}
          />
        </section>
      </div>
      <div className="report-flow">
        <span>คำขอ</span>
        <b>→</b>
        <span>ผู้ให้บริการ</span>
        <b>→</b>
        <span>ธุรกรรมเสร็จสิ้น</span>
        <b>→</b>
        <span>ห่วงโซ่คุณค่า</span>
        <b>→</b>
        <span>KPI05</span>
      </div>
    </>
  )
}

const prRows = [
  [
    "Active Aging 2569",
    "Facebook",
    "facebook / social / active-aging-2569",
    "เมืองสงขลา · บ่อยาง",
    1240,
    4200,
    318,
    "164 / 28",
    "page_view · service_click · request_submit",
  ],
  [
    "ตลาดชุมชนสงขลา",
    "QR / Event",
    "qr / offline / community-market",
    "หาดใหญ่ · คอหงส์",
    860,
    2350,
    204,
    "126 / 19",
    "page_view · product_click · order_submit",
  ],
] as const

export function AdminPrReportView({ viewer = false }: { viewer?: boolean }) {
  return (
    <>
      <ReportHeader
        description="สรุป Campaign, UTM, Analytics Events, การเข้าถึง การคลิก และ Conversion จากข้อมูล Aggregate"
        title="ภาพรวมช่องทางและแคมเปญ"
      />
      {viewer ? <ViewerNotice /> : null}
      <AdminReportTabs
        active={viewer ? "/viewer/dashboard/pr" : "/admin/dashboard/pr"}
        viewer={viewer}
      />
      <ReportFilter extraLabel="แหล่งที่มา" />
      <div className="report-summary">
        <Metric label="การเปิดหน้า" meta="ข้อมูล Aggregate" value="2,100" />
        <Metric label="การเข้าถึง" meta="ตามตัวกรอง" value="6,550" />
        <Metric label="การคลิก" meta="ไปยังบริการ/แบบฟอร์ม" value="290" />
        <Metric label="การตอบสนอง" meta="16% จากการคลิก" value="47" />
      </div>
      <section className="report-panel">
        <h2>ผลลัพธ์ตามแคมเปญ</h2>
        <Bars items={prRows.map((item) => [item[0], item[5]])} />
      </section>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>แคมเปญ/ช่องทาง</th>
              <th>UTM</th>
              <th>พื้นที่</th>
              <th>เปิดหน้า</th>
              <th>เข้าถึง</th>
              <th>มีส่วนร่วม</th>
              <th>คลิก/ตอบสนอง</th>
              <th>Analytics Events</th>
            </tr>
          </thead>
          <tbody>
            {prRows.map((item) => (
              <tr key={item[0]}>
                <td>
                  <strong>{item[0]}</strong>
                  <small>{item[1]}</small>
                </td>
                <td>{item[2]}</td>
                <td>{item[3]}</td>
                <td>{item[4].toLocaleString("th-TH")}</td>
                <td>{item[5].toLocaleString("th-TH")}</td>
                <td>{item[6]}</td>
                <td>{item[7]}</td>
                <td>{item[8]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="report-privacy">
        ข้อมูลทั้งหมดเป็นข้อมูล Aggregate และไม่แสดงข้อมูลระบุตัวบุคคล
      </div>
    </>
  )
}

function ViewerNotice() {
  return (
    <div className="report-readonly">
      <strong>ผู้บริหาร · ดูข้อมูลเท่านั้น</strong>
      <span>กรองและเปรียบเทียบรายงานได้ แต่แก้ไขข้อมูล ตัวชี้วัด หรือธุรกรรมไม่ได้</span>
    </div>
  )
}

function ReportHeader({ description, title }: { description: string; title: string }) {
  return (
    <header className="admin-page-header">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </header>
  )
}

function ReportFilter({ extraLabel }: { extraLabel?: string }) {
  return (
    <form className="report-filter">
      <label>
        <span>ช่วงเวลา</span>
        <select defaultValue="2026-Q3">
          <option value="2026-Q3">ไตรมาส 3/2569</option>
          <option value="2026-Q2">ไตรมาส 2/2569</option>
          <option value="all">สะสมปี 2569</option>
        </select>
      </label>
      <label>
        <span>พื้นที่</span>
        <select defaultValue="">
          <option value="">ทุกพื้นที่</option>
          {areas.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      {extraLabel ? (
        <label>
          <span>{extraLabel}</span>
          <select defaultValue="">
            <option value="">{extraLabel === "ตัวชี้วัด" ? "ผู้เข้าร่วม" : "ทุกแหล่งที่มา"}</option>
          </select>
        </label>
      ) : null}
      <button className="workspace-button" type="submit">
        ใช้ตัวกรอง
      </button>
    </form>
  )
}

function Metric({ label, meta, value }: { label: string; meta: string; value: string }) {
  return (
    <article className="report-metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{meta}</small>
    </article>
  )
}

function Bars({ items }: { items: ReadonlyArray<readonly [string, number]> }) {
  const max = Math.max(...items.map((item) => item[1]), 1)
  return (
    <div className="report-bars" role="img">
      {items.map(([label, value]) => (
        <div key={label}>
          <span>{label}</span>
          <div>
            <i style={{ width: `${Math.round((value / max) * 100)}%` }} />
          </div>
          <strong>{value.toLocaleString("th-TH")}</strong>
        </div>
      ))}
    </div>
  )
}
