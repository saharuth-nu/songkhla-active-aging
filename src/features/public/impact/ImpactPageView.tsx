import { PageHero } from "../components/PageHero"
import { PublicIcon } from "../components/PublicIcon"
import { kpis } from "../mocks/public-data"

export function ImpactPageView() {
  const records = kpis.map(([id, title, target, actual, unit]) => {
    const progress = Math.min(100, Math.round((actual / target) * 100))
    return { actual, id, progress, target, title, unit }
  })
  const achieved = records.filter((item) => item.progress >= 100).length
  const onTrack = records.filter((item) => item.progress >= 70 && item.progress < 100).length
  const attention = records.length - achieved - onTrack

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        description="Target, Actual, Progress และ Status ของ KPI01–KPI12 จากข้อมูลรวมจำลอง โดยไม่มีข้อมูลส่วนบุคคลหรือการเจาะรายบุคคล"
        title="ผลลัพธ์โครงการในภาพรวม"
      />
      <div className="site-container public-content-shell">
        <aside className="privacy-note">
          <PublicIcon name="shield-check" />
          <div>
            <strong>Aggregate only · Privacy baseline</strong>
            <p>
              หน้าสาธารณะแสดงเฉพาะผลรวมระดับโครงการ ไม่แสดงชื่อ Contact รหัสผู้รับบริการ
              หรือข้อมูลราย Transaction
            </p>
          </div>
        </aside>
        <section className="impact-status-summary" aria-label="สรุปสถานะตัวชี้วัด">
          <StatusCard label="KPI ทั้งหมด" value={records.length} note="KPI01–KPI12" />
          <StatusCard label="บรรลุ" value={achieved} note="Progress ≥ 100%" />
          <StatusCard label="กำลังดำเนินการ" value={onTrack} note="Progress 70–99%" />
          <StatusCard label="ต้องเร่งรัด" value={attention} note="Progress < 70%" />
        </section>
        <div className="impact-source-note">
          <span>Actual KPI01–KPI11 คำนวณจากข้อมูลต้นทาง · KPI12 บันทึกโดย Project Admin</span>
          <span>อัปเดตล่าสุด 5 กันยายน 2569</span>
        </div>
        <div className="metric-grid">
          {records.map((item) => {
            const status =
              item.progress >= 100
                ? "บรรลุ"
                : item.progress >= 70
                  ? "กำลังดำเนินการ"
                  : "ต้องเร่งรัด"
            const statusClass =
              item.progress >= 100 ? "achieved" : item.progress >= 70 ? "on-track" : "attention"
            return (
              <article className="metric-card" key={item.id}>
                <span className="metric-card__label">
                  {item.id} · {item.title}
                </span>
                <strong className="metric-card__value">
                  {item.actual.toLocaleString("th-TH")} {item.unit}
                </strong>
                <span className="metric-card__meta">
                  เป้าหมาย {item.target.toLocaleString("th-TH")}
                </span>
                <div
                  aria-label={item.title}
                  aria-valuemax={100}
                  aria-valuemin={0}
                  aria-valuenow={item.progress}
                  className="metric-progress"
                  role="progressbar"
                >
                  <span style={{ width: `${item.progress}%` }} />
                </div>
                <div className="metric-card__footer">
                  <span className={`metric-status metric-status--${statusClass}`}>{status}</span>
                  <span>{item.progress}%</span>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </main>
  )
}

function StatusCard({ label, note, value }: { label: string; note: string; value: number }) {
  return (
    <article>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  )
}
