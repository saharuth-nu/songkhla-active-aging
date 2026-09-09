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

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600">
                <span className="text-sm font-bold text-white">SAA</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm leading-tight font-bold text-gray-900">
                  Songkhla Active Aging
                </div>
                <div className="text-xs text-gray-500">สุขภาวะผู้สูงอายุสงขลา</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.slice(0, 6).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-teal-50 hover:text-teal-700"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                className="hidden items-center rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700 sm:inline-flex"
              >
                ลงทะเบียน
              </Link>
              <Link
                href="/admin/dashboard"
                className="hidden items-center rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-500 transition-colors hover:text-gray-700 sm:inline-flex"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <div className="mb-3 text-lg font-bold text-white">Songkhla Active Aging</div>
              <p className="text-sm leading-relaxed text-gray-400">
                โครงการนวัตกรรมกระบวนการมีส่วนร่วมเพื่อสร้างสุขภาวะและ
                เศรษฐกิจสุขภาพผู้สูงอายุอย่างยั่งยืน จังหวัดสงขลา
              </p>
            </div>
            <div>
              <div className="mb-3 font-semibold text-white">ลิงก์ด่วน</div>
              <ul className="space-y-2">
                {NAV_LINKS.slice(0, 5).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-teal-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-3 font-semibold text-white">ติดตามเรา</div>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Facebook: Hatyai Connext</p>
                <p>สแกน QR Code เพื่อรับบริการ</p>
                <div className="mt-4">
                  <Link
                    href="/register"
                    className="inline-flex items-center rounded-lg border border-teal-600 px-4 py-2 text-sm font-medium text-teal-400 transition-colors hover:bg-teal-900"
                  >
                    ลงทะเบียนรับบริการ
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
            © 2025 Songkhla Active Aging — มหาวิทยาลัยสงขลานครินทร์
          </div>
        </div>
      </footer>
    </div>
  )
}
