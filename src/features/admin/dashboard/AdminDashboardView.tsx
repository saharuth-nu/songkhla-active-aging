import { AdminReportTabs } from "../components/AdminReportTabs"
import { kpis } from "@/features/public/mocks/public-data"
import { KpiProgressChart, KpiStatusChart } from "./DashboardCharts"

const areas = [
  ["AREA-01", "เมืองสงขลา · บ่อยาง"],
  ["AREA-02", "หาดใหญ่ · คอหงส์"],
  ["AREA-03", "สิงหนคร · หัวเขา"],
  ["AREA-04", "สะเดา · สำนักขาม"],
] as const

export function AdminDashboardView({ viewer = false }: { viewer?: boolean }) {
  const records = kpis.map(([id, title, target, actual, unit]) => {
    const percent = Math.min(100, Math.round((actual / target) * 100))
    const status = percent >= 100 ? "reached" : percent >= 70 ? "progress" : "attention"
    return { actual, id, percent, status, target, title, unit }
  })
  const average = Math.round(records.reduce((sum, item) => sum + item.percent, 0) / records.length)
  const reached = records.filter((item) => item.status === "reached").length
  const progress = records.filter((item) => item.status === "progress").length
  const attention = records.length - reached - progress

  return (
    <>
      <header className="admin-page-header">
        <div>
          <h1>ภาพรวมผลลัพธ์โครงการ</h1>
          <p>สรุปเป้าหมาย ผลจริง และความคืบหน้าตาม KPI Mapping</p>
        </div>
      </header>
      {viewer ? <ViewerNotice /> : null}
      <AdminReportTabs active={viewer ? "/viewer/dashboard" : "/admin/dashboard"} viewer={viewer} />
      <form className="report-filter">
        <label>
          <span>ช่วงเวลา</span>
          <select defaultValue="2026-Q3" name="period">
            <option value="2026-Q3">ไตรมาส 3/2569</option>
            <option value="2026-Q2">ไตรมาส 2/2569</option>
            <option value="all">สะสมปี 2569</option>
          </select>
        </label>
        <label>
          <span>พื้นที่</span>
          <select defaultValue="" name="area">
            <option value="">ทุกพื้นที่</option>
            {areas.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>กลุ่ม KPI</span>
          <select defaultValue="all" name="group">
            <option value="all">ทุกกลุ่ม</option>
            <option value="network">เครือข่าย</option>
            <option value="people">ผู้เข้าร่วมและการจ้างงาน</option>
            <option value="service">บริการและรายได้</option>
            <option value="innovation">นวัตกรรมและองค์ความรู้</option>
          </select>
        </label>
        <button className="workspace-button" type="submit">
          ใช้ตัวกรอง
        </button>
      </form>
      <div className="report-summary">
        <Metric
          label="ความคืบหน้าเฉลี่ย"
          meta="จาก KPI 12 ตัวที่ตรงเงื่อนไข"
          value={`${average}%`}
        />
        <Metric label="ถึงเป้าหมาย" meta="ตัวชี้วัด" value={`${reached} / 12`} />
        <Metric label="ผู้รับบริการ" meta="ตามพื้นที่ที่เลือก" value="1 คน" />
        <Metric label="คำขอ" meta="ตามช่วงเวลาและพื้นที่" value="2 รายการ" />
      </div>
      <div className="report-dashboard-grid">
        <section className="report-panel report-panel--wide">
          <div>
            <h2>ความคืบหน้าตามตัวชี้วัด</h2>
            <span>พื้นที่: ทุกพื้นที่</span>
          </div>
          <div className="report-chart">
            <KpiProgressChart records={records} />
          </div>
        </section>
        <section className="report-panel">
          <h2>สถานะ KPI</h2>
          <div className="report-chart report-chart--keep-fallback">
            <KpiStatusChart attention={attention} progress={progress} reached={reached} />
            <ul aria-label="จำนวน KPI แยกตามสถานะ" className="report-status-list">
              <li>
                <i className="is-reached" /> <span>บรรลุ</span> <strong>{reached} ตัวชี้วัด</strong>
              </li>
              <li>
                <i className="is-progress" /> <span>กำลังดำเนินการ</span>{" "}
                <strong>{progress} ตัวชี้วัด</strong>
              </li>
              <li>
                <i className="is-attention" /> <span>ต้องเร่งรัด</span>{" "}
                <strong>{attention} ตัวชี้วัด</strong>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table report-kpi-summary">
          <thead>
            <tr>
              <th>ตัวชี้วัด</th>
              <th>เป้าหมาย</th>
              <th>ผลจริง</th>
              <th>ความคืบหน้า</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.id}</strong>
                  <small>{item.title}</small>
                </td>
                <td>{`${item.target.toLocaleString("th-TH")} ${item.unit}`}</td>
                <td>{`${item.actual.toLocaleString("th-TH")} ${item.unit}`}</td>
                <td>{item.percent}%</td>
                <td>
                  <span className={`report-status report-status--${item.status}`}>
                    {item.status === "reached"
                      ? "บรรลุ"
                      : item.status === "progress"
                        ? "กำลังดำเนินการ"
                        : "ต้องเร่งรัด"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

function Metric({ label, meta, value }: { label: string; meta: string; value: string }) {
  return (
    <article className="report-metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{meta}</small>
    </article>
  )
}
