import Link from "next/link"
import { adminModules, type AdminModuleKey } from "@/features/admin/mocks/admin-data"

export default async function Page({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params
  const config = adminModules[module as AdminModuleKey]
  const back = config?.path || "/admin/dashboard"
  return (
    <>
      <header className="admin-page-header">
        <div>
          <h1>ไม่พบข้อมูลร่าง</h1>
          <p>เริ่มจากแบบฟอร์มข้อมูลหลักก่อน</p>
        </div>
      </header>
      <section className="admin-state">
        <span aria-hidden="true">!</span>
        <div>
          <h2>ไม่มีข้อมูลร่าง</h2>
          <p>ยังไม่มีข้อมูลสำหรับตรวจสอบก่อนบันทึก</p>
          <Link className="workspace-button" href={back}>
            กลับ
          </Link>
        </div>
      </section>
    </>
  )
}
