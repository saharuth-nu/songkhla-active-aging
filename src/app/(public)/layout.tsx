import Link from "next/link"

const NAV_LINKS = [
  { href: "/", label: "หน้าแรก" },
  { href: "/about", label: "เกี่ยวกับโครงการ" },
  { href: "/innovation", label: "นวัตกรรม" },
  { href: "/products", label: "ผลิตภัณฑ์/บริการ" },
  { href: "/health-services", label: "บริการสุขภาพ" },
  { href: "/knowledge", label: "คลังความรู้" },
  { href: "/news", label: "ข่าว/กิจกรรม" },
  { href: "/impact", label: "ผลลัพธ์ KPI" },
  { href: "/partners", label: "เครือข่าย" },
  { href: "/contact", label: "ติดต่อ/ลงทะเบียน" },
]

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SAA</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-gray-900 leading-tight">
                  Songkhla Active Aging
                </div>
                <div className="text-xs text-gray-500">สุขภาวะผู้สูงอายุสงขลา</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.slice(0, 6).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm text-gray-600 hover:text-teal-700 hover:bg-teal-50 rounded-md transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
              >
                ลงทะเบียน
              </Link>
              <Link
                href="/admin/dashboard"
                className="hidden sm:inline-flex items-center px-3 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-white font-bold text-lg mb-3">
                Songkhla Active Aging
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                โครงการนวัตกรรมกระบวนการมีส่วนร่วมเพื่อสร้างสุขภาวะและ
                เศรษฐกิจสุขภาพผู้สูงอายุอย่างยั่งยืน จังหวัดสงขลา
              </p>
            </div>
            <div>
              <div className="text-white font-semibold mb-3">ลิงก์ด่วน</div>
              <ul className="space-y-2">
                {NAV_LINKS.slice(0, 5).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-white font-semibold mb-3">ติดตามเรา</div>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Facebook: Hatyai Connext</p>
                <p>สแกน QR Code เพื่อรับบริการ</p>
                <div className="mt-4">
                  <Link
                    href="/register"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-teal-400 border border-teal-600 rounded-lg hover:bg-teal-900 transition-colors"
                  >
                    ลงทะเบียนรับบริการ
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-500">
            © 2025 Songkhla Active Aging — มหาวิทยาลัยสงขลานครินทร์
          </div>
        </div>
      </footer>
    </div>
  )
}
