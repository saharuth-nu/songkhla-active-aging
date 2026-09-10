import { kpis } from "@/features/public/mocks/public-data"

const sources = [
  ["partners", "COUNT(*) WHERE type = 'SE' AND status = active"],
  ["trainings", "COUNT(DISTINCT participant)"],
  ["tech-transfer", "COUNT(DISTINCT receiver)"],
  ["services", "COUNT(*) WHERE status = active"],
  ["transactions", "SUM(communityIncome) / SUM(amount) × 100; completed only"],
  ["employments", "COUNT(DISTINCT personCode) WHERE status = active"],
  ["beneficiaries", "COUNT(DISTINCT id) WHERE service IS NOT EMPTY AND status = active"],
  ["partners", "COUNT(DISTINCT type) WHERE status = active"],
  ["innovations", "COUNT(*) WHERE type = 'เทคโนโลยี'"],
  ["innovations", "COUNT(*) WHERE type = 'ธุรกิจหรือระบบ'"],
  ["content", "COUNT(*) WHERE type IN ('คู่มือ','องค์ความรู้') AND status = active"],
  ["kpi_manual_input", "ผู้ดูแลยืนยัน actual = 1 เมื่อระบบพร้อมใช้งาน"],
] as const

export function AdminKpiView() {
  return (
    <>
      <header className="admin-page-header">
        <div>
          <h1>จัดการ KPI และแหล่งข้อมูล</h1>
          <p>KPI01–11 คำนวณจากข้อมูลต้นทางแบบดูอย่างเดียว ส่วน KPI12 บันทึกโดยผู้ดูแลโครงการ</p>
        </div>
      </header>
      <div className="admin-table-wrap">
        <table className="admin-table report-kpi-table">
          <thead>
            <tr>
              <th>ตัวชี้วัด</th>
              <th>เป้าหมาย</th>
              <th>ผลจริง</th>
              <th>ความคืบหน้า</th>
              <th>แหล่งข้อมูล/สูตร</th>
            </tr>
          </thead>
          <tbody>
            {kpis.map(([id, title, target, actual, unit], index) => {
              const percent = Math.round((actual / target) * 100)
              return (
                <tr key={id}>
                  <td>
                    <strong>{id}</strong>
                    <small>{title}</small>
                  </td>
                  <td>
                    {target.toLocaleString("th-TH")} {unit}
                  </td>
                  <td>
                    <strong>{actual.toLocaleString("th-TH")}</strong> {unit}
                    <small>
                      {id === "KPI12" ? "กรอกด้วยผู้ดูแล" : "คำนวณอัตโนมัติ · ดูอย่างเดียว"}
                    </small>
                  </td>
                  <td>
                    <div className="report-progress">
                      <span style={{ width: `${Math.min(100, percent)}%` }} />
                    </div>
                    <small>
                      {title} · {percent}%
                    </small>
                  </td>
                  <td>
                    <strong>{sources[index][0]}</strong>
                    <small>{sources[index][1]}</small>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <section className="report-manual">
        <div>
          <p className="eyebrow">ตัวชี้วัดที่กรอกด้วยผู้ดูแล</p>
          <h2>KPI12 · ระบบฐานข้อมูล/แพลตฟอร์มดิจิทัล</h2>
          <p>ยืนยันค่า 1 เมื่อระบบพร้อมใช้งาน ค่า 0 หมายถึงยังไม่พร้อมใช้งาน</p>
          <dl>
            <div>
              <dt>แหล่งข้อมูล</dt>
              <dd>kpi_manual_input</dd>
            </div>
            <div>
              <dt>อัปเดตล่าสุด</dt>
              <dd>2026-09-05T09:00:00+07:00</dd>
            </div>
          </dl>
        </div>
        <form>
          <div className="admin-form-grid">
            <label className="admin-field">
              <span>ผลจริง (ระบบ)</span>
              <input defaultValue="0" max="1" min="0" name="actual" required type="number" />
            </label>
            <label className="admin-field">
              <span>ช่วงเวลา</span>
              <select defaultValue="2026-Q3" name="period" required>
                <option value="2026-Q3">ไตรมาส 3/2569</option>
                <option value="2026-Q2">ไตรมาส 2/2569</option>
              </select>
            </label>
            <label className="admin-field admin-field--full">
              <span>หมายเหตุ / หลักฐาน</span>
              <textarea defaultValue="ระบบยังไม่พร้อมใช้งาน" name="note" required />
            </label>
            <label className="admin-field admin-field--full">
              <span>บันทึกโดย</span>
              <input defaultValue="ผู้ดูแลโครงการ" name="inputBy" required />
            </label>
          </div>
          <button className="workspace-button workspace-button--primary" type="submit">
            บันทึก KPI12
          </button>
        </form>
      </section>
    </>
  )
}
