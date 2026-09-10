import Link from "next/link"

const tabs = [
  ["ภาพรวมโครงการ", ""],
  ["รายพื้นที่", "/area"],
  ["ธุรกรรมและรายได้", "/business"],
  ["ประชาสัมพันธ์", "/pr"],
] as const

export function AdminReportTabs({ active, viewer = false }: { active: string; viewer?: boolean }) {
  const prefix = viewer ? "/viewer/dashboard" : "/admin/dashboard"
  return (
    <nav aria-label="ประเภทรายงาน" className="report-tabs">
      {tabs.map(([label, suffix]) => {
        const href = `${prefix}${suffix}`
        return (
          <Link aria-current={active === href ? "page" : undefined} href={href} key={href}>
            <span>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
