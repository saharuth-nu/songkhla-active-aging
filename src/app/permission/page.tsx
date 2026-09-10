import Link from "next/link"

export default async function Page({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const { role } = await searchParams
  const label = role === "viewer" ? "ผู้บริหาร" : "ผู้ดูแลโครงการ"
  return (
    <main className="permission-page" id="main-content">
      <section aria-labelledby="permission-title" className="permission-card">
        <span aria-hidden="true" className="permission-card__mark">
          !
        </span>
        <p className="eyebrow">Permission state</p>
        <h1 id="permission-title">ไม่มีสิทธิ์เข้าถึงหน้านี้</h1>
        <p>กรุณาเข้าสู่ระบบด้วยบัญชีสำหรับ {label}</p>
        <div className="permission-card__actions">
          <Link
            className="workspace-button workspace-button--primary"
            href={`/login?role=${role === "viewer" ? "viewer" : "admin"}`}
          >
            เข้าสู่ระบบที่ถูกต้อง
          </Link>
          <Link className="workspace-button" href="/">
            กลับเว็บไซต์สาธารณะ
          </Link>
        </div>
      </section>
    </main>
  )
}
