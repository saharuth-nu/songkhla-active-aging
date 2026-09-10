"use client"

import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { ButtonLink } from "@/components/ui"
import { usePublicNavigation } from "../hooks/usePublicNavigation"
import { navigation } from "../mocks/public-data"
import { PublicIcon } from "./PublicIcon"

export function PublicShell({ children }: { children: ReactNode }) {
  const nav = usePublicNavigation()

  return (
    <>
      <a className="skip-link" href="#main-content">
        ข้ามไปยังเนื้อหาหลัก
      </a>
      <aside className="build-note" aria-label="ข้อมูลการทดสอบ">
        <div className="site-container build-note__inner">
          <span>ข้อมูลตัวอย่างสำหรับการทดสอบระบบ</span>
          <span>
            <Link href="/login">เข้าสู่ระบบสำหรับเจ้าหน้าที่</Link>
          </span>
        </div>
      </aside>
      <header className="site-header" data-nav-open={nav.isOpen}>
        <div className="site-container site-header__inner">
          <Link className="brand-placeholder" href="/" aria-label="Songkhla Active หน้าแรก">
            <Image
              alt=""
              aria-hidden="true"
              className="brand-placeholder__mark"
              height={1254}
              priority
              src="/img/Logo.png"
              width={1254}
            />
            <span className="brand-placeholder__text">
              <strong>Songkhla Active</strong>
              <small>สุขภาวะดีในทุกช่วงวัย</small>
            </span>
          </Link>
          <nav className="site-nav" id="primary-nav" aria-label="เมนูหลัก">
            {navigation.map((item) => (
              <Link
                aria-current={nav.activeKey === item.key ? "page" : undefined}
                href={item.href}
                key={item.key}
                onClick={nav.close}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="site-header__actions">
            <ButtonLink className="button button--secondary" href="/contact" variant="secondary">
              ติดต่อโครงการ
            </ButtonLink>
            <ButtonLink className="button" href="/register">
              ลงทะเบียน
            </ButtonLink>
          </div>
          <button
            aria-controls="primary-nav"
            aria-expanded={nav.isOpen}
            className="menu-button"
            onClick={nav.toggle}
            type="button"
          >
            <span>{nav.isOpen ? "ปิดเมนู" : "เมนู"}</span>
            <span>
              <PublicIcon name={nav.isOpen ? "x" : "menu"} />
            </span>
          </button>
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <div className="site-container footer-grid">
          <section className="footer-brand" aria-labelledby="footer-brand-title">
            <Image
              alt=""
              aria-hidden="true"
              className="footer-brand__mark"
              height={1254}
              src="/img/Logo.png"
              width={1254}
            />
            <p className="eyebrow eyebrow--on-dark">Better people · Brighter Songkhla</p>
            <h2 id="footer-brand-title">Songkhla Active</h2>
            <p>
              พื้นที่กลางสำหรับค้นหาบริการ ความรู้ และกิจกรรมที่สนับสนุนการใช้ชีวิตอย่างมีคุณภาพ
            </p>
          </section>
          <FooterColumn
            id="footer-project-title"
            items={[
              ["เกี่ยวกับโครงการ", "/about"],
              ["นวัตกรรม", "/innovation"],
              ["ผลลัพธ์โครงการ", "/impact"],
              ["ภาคีเครือข่าย", "/partners"],
            ]}
            title="ข้อมูลโครงการ"
          />
          <FooterColumn
            id="footer-services-title"
            items={[
              ["สินค้าและบริการ", "/products"],
              ["องค์ความรู้", "/knowledge"],
              ["ข่าวและกิจกรรม", "/news"],
            ]}
            title="บริการ"
          />
          <FooterColumn
            id="footer-help-title"
            items={[
              ["ลงทะเบียน", "/register"],
              ["ติดตามสถานะคำขอ", "/request"],
              ["ติดต่อโครงการ", "/contact"],
            ]}
            title="ช่วยเหลือ"
          />
        </div>
        <div className="site-container footer-bottom">
          <span>Songkhla Active Aging Model</span>
          <nav aria-label="นโยบายและการช่วยเหลือ">
            <Link href="/privacy">ประกาศความเป็นส่วนตัว</Link>
            <Link href="/terms">เงื่อนไขการใช้งาน</Link>
            <Link href="/accessibility">การช่วยการเข้าถึง</Link>
          </nav>
        </div>
      </footer>
    </>
  )
}

function FooterColumn({
  id,
  items,
  title,
}: {
  id: string
  items: ReadonlyArray<readonly [string, string]>
  title: string
}) {
  return (
    <nav className="footer-column" aria-labelledby={id}>
      <h3 id={id}>{title}</h3>
      <ul>
        {items.map(([label, href]) => (
          <li key={href}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
