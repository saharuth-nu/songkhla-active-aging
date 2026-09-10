"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { PublicIcon, type PublicIconName } from "@/features/public/components/PublicIcon"
import { useAdminNavigation } from "../hooks/useAdminNavigation"

const groups: ReadonlyArray<{
  label: string
  links: ReadonlyArray<{ href: string; icon: PublicIconName; label: string }>
}> = [
  {
    label: "ภาพรวม",
    links: [{ href: "/admin/dashboard", icon: "chart", label: "ภาพรวมโครงการ" }],
  },
  {
    label: "ข้อมูลหลัก",
    links: [
      { href: "/admin/data/beneficiaries", icon: "users", label: "ผู้รับบริการ" },
      { href: "/admin/data/services", icon: "tag", label: "สินค้าและบริการ" },
      { href: "/admin/data/trainings", icon: "book-open", label: "การพัฒนาศักยภาพ" },
      { href: "/admin/data/tech-transfer", icon: "arrow-right", label: "การถ่ายทอดเทคโนโลยี" },
      { href: "/admin/data/employments", icon: "briefcase", label: "การจ้างงาน" },
      { href: "/admin/data/partners", icon: "users", label: "ภาคีเครือข่าย" },
      { href: "/admin/data/innovations", icon: "heart-pulse", label: "นวัตกรรม" },
      { href: "/admin/data/content", icon: "book-open", label: "จัดการเนื้อหา" },
      { href: "/admin/data/users", icon: "shield-check", label: "ผู้ใช้และสิทธิ์" },
    ],
  },
  {
    label: "งานดำเนินการ",
    links: [
      { href: "/admin/import-export", icon: "arrow-right", label: "นำเข้า / ส่งออกข้อมูล" },
      { href: "/admin/campaigns", icon: "calendar", label: "จัดการแคมเปญ" },
      { href: "/admin/transactions", icon: "briefcase", label: "คำขอและธุรกรรม" },
      { href: "/admin/partner-intake", icon: "users", label: "รับข้อมูลจากภาคี" },
    ],
  },
  {
    label: "ติดตามผลและรายงาน",
    links: [
      { href: "/admin/kpi", icon: "chart", label: "จัดการตัวชี้วัด (KPI)" },
      { href: "/admin/dashboard/area", icon: "map-pin", label: "ผลการดำเนินงานรายพื้นที่" },
      { href: "/admin/dashboard/business", icon: "briefcase", label: "ธุรกรรมและรายได้ชุมชน" },
      { href: "/admin/dashboard/pr", icon: "chart", label: "ผลการประชาสัมพันธ์" },
    ],
  },
]

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const nav = useAdminNavigation()

  return (
    <div className="workspace-shell" data-menu-open={nav.isOpen} data-workspace-role="admin">
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
        <Link className="workspace-brand" href="/admin/dashboard" onClick={nav.close}>
          <span aria-hidden="true" className="workspace-brand__mark">
            <Image alt="" height={1254} src="/img/Logo.png" width={1254} />
          </span>
          <span>
            <strong>Songkhla Active</strong>
            <small>ผู้ดูแลโครงการ</small>
          </span>
        </Link>
        <nav aria-label="เมนูพื้นที่ทำงาน" className="workspace-nav">
          {groups.map((group) => (
            <div className="workspace-nav__group" key={group.label}>
              <span className="workspace-nav__label">{group.label}</span>
              {group.links.map((item) => (
                <Link
                  aria-current={
                    pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? "page"
                      : undefined
                  }
                  href={item.href}
                  key={item.href}
                  onClick={nav.close}
                >
                  <span className="workspace-nav__icon">
                    <PublicIcon name={item.icon} />
                  </span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          ))}
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
            เข้าสู่ระบบเป็น <strong>ผู้ดูแลโครงการ</strong>
          </span>
        </header>
        <main className="workspace-main" id="main-content">
          {children}
        </main>
      </div>
    </div>
  )
}
