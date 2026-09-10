import Link from "next/link"
import { cn } from "@/lib/utils"
import { adminModules, adminStatusLabels, type AdminModuleKey } from "../mocks/admin-data"

export function AdminListPage({ module }: { module: AdminModuleKey }) {
  const config = adminModules[module]

  return (
    <>
      <header className="admin-page-header">
        <div>
          <h1>{config.title}</h1>
          <p>ค้นหา กรอง เพิ่ม และแก้ไขข้อมูลในหมวดนี้</p>
        </div>
        <Link className="workspace-button workspace-button--primary" href={`${config.path}/new`}>
          เพิ่ม{config.singular}
        </Link>
      </header>
      <form action={config.path} className="admin-toolbar">
        <label>
          <span>ค้นหา</span>
          <input name="q" placeholder="รหัส ชื่อ หรือข้อมูลในรายการ" />
        </label>
        <label>
          <span>สถานะ</span>
          <select defaultValue="" name="status">
            <option value="">ทุกสถานะ</option>
            {Object.entries(adminStatusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <button className="workspace-button" type="submit">
          ค้นหา/กรอง
        </button>
      </form>
      <div className="admin-list-meta">
        <strong>
          ทั้งหมด {config.records.length} · แสดง {config.records.length}
        </strong>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>รายการ</th>
              <th>รูปภาพ</th>
              <th>สถานะ</th>
              <th>ดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            {config.records.map((record) => (
              <tr key={record.id}>
                <td>
                  <strong>{record.title}</strong>
                  <small>{record.id}</small>
                </td>
                <td>
                  <span
                    className={cn(
                      "admin-image-status",
                      record.imageCode && "admin-image-status--ready",
                    )}
                  >
                    {record.imageCode ? "มีรูปภาพแล้ว" : "ยังไม่มีรูปภาพ"}
                  </span>
                </td>
                <td>
                  <span className={`admin-status admin-status--${record.status}`}>
                    {adminStatusLabels[record.status]}
                  </span>
                </td>
                <td>
                  <Link href={`${config.path}/${record.id}`}>ดู/แก้ไข →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
