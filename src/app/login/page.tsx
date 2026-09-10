import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ResetMockButton } from "./ResetMockButton"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ role?: "admin" | "viewer" }>
}) {
  const { role } = await searchParams
  const account =
    role === "admin"
      ? { label: "ผู้ดูแลโครงการ", password: "demo", username: "admin" }
      : role === "viewer"
        ? { label: "ผู้บริหาร", password: "demo", username: "viewer" }
        : null

  return (
    <main className="workspace-login" id="main-content">
      <div className="workspace-login__back">
        <Link href="/">← กลับเว็บไซต์สาธารณะ</Link>
      </div>
      <section aria-labelledby="login-title" className="login-card">
        <div className="login-card__brand">
          <span aria-hidden="true" className="login-card__mark">
            <Image alt="" height={1254} src="/img/Logo.png" width={1254} />
          </span>
          <div>
            <strong>Songkhla Active</strong>
            <small>พื้นที่ทำงานโครงการ</small>
          </div>
        </div>
        <h1 id="login-title">
          {account ? `เข้าสู่ระบบสำหรับ${account.label}` : "เลือกบทบาทเพื่อเข้าสู่ระบบ"}
        </h1>
        <p className="login-card__lead">
          เลือกเข้าเว็บไซต์สาธารณะ หรือเข้าสู่พื้นที่ทำงานตามบทบาทของคุณ
        </p>
        <div aria-label="เลือกบทบาท" className="role-choice">
          <Link className="role-choice__item" href="/">
            <strong>ประชาชนทั่วไป</strong>
            <span>เปิดเว็บไซต์สาธารณะโดยไม่ต้องเข้าสู่ระบบ</span>
          </Link>
          <Link
            className={cn("role-choice__item", role === "admin" && "is-selected")}
            href="/login?role=admin"
          >
            <strong>ผู้ดูแลโครงการ</strong>
            <span>จัดการข้อมูลและติดตามการดำเนินงาน</span>
          </Link>
          <Link
            className={cn("role-choice__item", role === "viewer" && "is-selected")}
            href="/login?role=viewer"
          >
            <strong>ผู้บริหาร</strong>
            <span>อ่านรายงานและเปรียบเทียบผลลัพธ์</span>
          </Link>
        </div>
        {account ? (
          <form
            action={role === "viewer" ? "/viewer/dashboard" : "/admin/dashboard"}
            className="login-form"
          >
            <div className="login-demo">
              <strong>ข้อมูลเข้าสู่ระบบ</strong>
              <code>
                {account.username} / {account.password}
              </code>
            </div>
            <label>
              ชื่อผู้ใช้
              <input
                autoComplete="username"
                defaultValue={account.username}
                name="username"
                required
              />
            </label>
            <label>
              รหัสผ่าน
              <input
                autoComplete="current-password"
                defaultValue={account.password}
                name="password"
                required
                type="password"
              />
            </label>
            <button className="workspace-button workspace-button--primary" type="submit">
              เข้าสู่ระบบ
            </button>
          </form>
        ) : (
          <p className="login-prompt">เลือกบทบาทด้านบนเพื่อแสดงบัญชีและแบบฟอร์มเข้าสู่ระบบ</p>
        )}
        <div className="login-reset">
          <ResetMockButton />
        </div>
      </section>
    </main>
  )
}
