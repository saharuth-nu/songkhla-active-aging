import Link from "next/link"

const ADMIN_NAV = [
  { href: "/admin/dashboard", label: "ภาพรวม", icon: "📊" },
  { href: "/admin/kpi", label: "KPI Dashboard", icon: "🎯" },
  { href: "/admin/products", label: "ผลิตภัณฑ์/บริการ", icon: "🏥" },
  { href: "/admin/transactions", label: "ธุรกรรม/คำขอ", icon: "🛒" },
  { href: "/admin/beneficiaries", label: "ผู้รับบริการ", icon: "👥" },
  { href: "/admin/training", label: "การพัฒนาศักยภาพ", icon: "📚" },
  { href: "/admin/employment", label: "การจ้างงาน", icon: "💼" },
  { href: "/admin/partners", label: "เครือข่าย", icon: "🤝" },
  { href: "/admin/innovation", label: "นวัตกรรม", icon: "💡" },
  { href: "/admin/knowledge", label: "องค์ความรู้", icon: "📖" },
  { href: "/admin/users", label: "ผู้ใช้งาน", icon: "👤" },
  { href: "/admin/settings", label: "ตั้งค่า", icon: "⚙️" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-shrink-0 flex-col bg-gray-900 md:flex">
        <div className="border-b border-gray-800 p-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500">
              <span className="text-xs font-bold text-white">SAA</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Admin Panel</div>
              <div className="text-xs text-gray-400">Active Aging</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-gray-800 p-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 transition-colors hover:text-white"
          >
            ← กลับหน้าเว็บหลัก
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Top Bar */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <div className="text-sm text-gray-500">Songkhla Active Aging — Admin Panel</div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100">
              <span className="text-sm font-medium text-teal-700">A</span>
            </div>
            <span className="hidden text-sm text-gray-700 sm:block">Admin</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
