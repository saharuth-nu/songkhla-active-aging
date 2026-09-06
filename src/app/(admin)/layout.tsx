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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 flex-shrink-0 hidden md:flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">SAA</span>
            </div>
            <div>
              <div className="text-white text-sm font-semibold">Admin Panel</div>
              <div className="text-gray-400 text-xs">Active Aging</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors text-sm"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-800">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            ← กลับหน้าเว็บหลัก
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Songkhla Active Aging — Admin Panel
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
              <span className="text-teal-700 text-sm font-medium">A</span>
            </div>
            <span className="text-sm text-gray-700 hidden sm:block">Admin</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
