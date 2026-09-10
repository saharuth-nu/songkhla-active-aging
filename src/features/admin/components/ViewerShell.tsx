"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { PublicIcon } from "@/features/public/components/PublicIcon"
import { useAdminNavigation } from "../hooks/useAdminNavigation"

const links = [
  ["/viewer/dashboard", "ภาพรวมโครงการ", "chart"],
  ["/viewer/dashboard/area", "ผลการดำเนินงานรายพื้นที่", "map-pin"],
  ["/viewer/dashboard/business", "ธุรกรรมและรายได้ชุมชน", "briefcase"],
  ["/viewer/dashboard/pr", "ผลการประชาสัมพันธ์", "chart"],
] as const

export function ViewerShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const nav = useAdminNavigation()
  return (
    <div className="workspace-shell" data-menu-open={nav.isOpen} data-workspace-role="viewer">
      <a className="skip-link" href="#main-content">
        ข้ามไปยังเนื้อหาหลัก
      </a>
      <aside className="workspace-sidebar" id="workspace-sidebar">
        <button
          aria-label="ปิดเมนูพื้นที่ทำงาน"
          className="workspace-sidebar__close"
          onClick={nav.close}
          type="button"
        >
          ×
        </button>
        <Link className="workspace-brand" href="/viewer/dashboard" onClick={nav.close}>
          <span aria-hidden="true" className="workspace-brand__mark">
            <Image alt="" height={1254} src="/img/Logo.png" width={1254} />
          </span>
          <span>
            <strong>Songkhla Active</strong>
            <small>ผู้บริหาร</small>
            <em>สิทธิ์ดูข้อมูลเท่านั้น</em>
          </span>
        </Link>
        <nav aria-label="เมนูพื้นที่ทำงาน" className="workspace-nav">
          <div className="workspace-nav__group">
            <span className="workspace-nav__label">ภาพรวม</span>
            <ViewerLink item={links[0]} pathname={pathname} close={nav.close} />
          </div>
          <div className="workspace-nav__group">
            <span className="workspace-nav__label">รายงาน</span>
            {links.slice(1).map((item) => (
              <ViewerLink close={nav.close} item={item} key={item[0]} pathname={pathname} />
            ))}
          </div>
        </nav>
        <Link className="workspace-button workspace-button--logout" href="/">
          ออกจากระบบ
        </Link>
      </aside>
      <div className="workspace-stage">
        <header className="workspace-topbar">
          <button
            aria-controls="workspace-sidebar"
            aria-expanded={nav.isOpen}
            className="workspace-menu"
            onClick={nav.open}
            type="button"
          >
            เมนู
          </button>
          <span>
            เข้าสู่ระบบเป็น <strong>ผู้บริหารโครงการ</strong>
          </span>
        </header>
        <main className="workspace-main" id="main-content">
          {children}
        </main>
      </div>
    </div>
  )
}

function ViewerLink({
  close,
  item,
  pathname,
}: {
  close: () => void
  item: (typeof links)[number]
  pathname: string
}) {
  const [href, label, icon] = item
  return (
    <Link aria-current={pathname === href ? "page" : undefined} href={href} onClick={close}>
      <span className="workspace-nav__icon">
        <PublicIcon name={icon} />
      </span>
      <span>{label}</span>
    </Link>
  )
}
