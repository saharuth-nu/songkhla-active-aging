"use client"

import Link from "next/link"
import { Button } from "@/components/ui"
import { useDisclosure } from "../hooks/useDisclosure"
import { PublicIcon } from "./PublicIcon"

export function ContactCta() {
  const disclosure = useDisclosure()

  return (
    <div className="cta-layout">
      <div>
        <p className="eyebrow eyebrow--on-dark">Contact & guidance</p>
        <h2 id="contact-title">ยังไม่แน่ใจว่าควรเริ่มจากบริการใด?</h2>
        <p>ติดต่อทีมโครงการเพื่อสอบถามข้อมูลหรือขอให้ช่วยประสานบริการ</p>
        <ul className="cta-expectations">
          <li>
            <PublicIcon name="shield-check" />
            <span>ทีมโครงการช่วยแนะนำช่องทางที่เกี่ยวข้อง</span>
          </li>
          <li>
            <PublicIcon name="shield-check" />
            <span>ไม่ต้องส่งข้อมูลละเอียดเกินความจำเป็น</span>
          </li>
          <li>
            <PublicIcon name="shield-check" />
            <span>เวลาตอบกลับขึ้นอยู่กับประเภทบริการและพื้นที่</span>
          </li>
        </ul>
      </div>
      <Button
        aria-controls="contact-details"
        aria-expanded={disclosure.isOpen}
        className="button button--on-dark"
        icon={<PublicIcon name="arrow-right" />}
        onClick={disclosure.toggle}
        onDark
      >
        {disclosure.isOpen ? "ซ่อนช่องทางติดต่อ" : "แสดงช่องทางติดต่อ"}
      </Button>
      <section
        className="contact-details"
        hidden={!disclosure.isOpen}
        id="contact-details"
        aria-labelledby="contact-details-title"
      >
        <h3 id="contact-details-title">ช่องทางติดต่อจำลอง</h3>
        <dl>
          <div>
            <dt>โทรศัพท์</dt>
            <dd>0XX-XXX-XXXX</dd>
          </div>
          <div>
            <dt>อีเมล</dt>
            <dd>contact@example.org</dd>
          </div>
          <div>
            <dt>เวลาทำการ</dt>
            <dd>จันทร์–ศุกร์ 08:30–16:30 น.</dd>
          </div>
        </dl>
        <Link className="card-link" href="/contact">
          <span>ไปหน้าติดต่อโครงการ</span>
          <PublicIcon name="arrow-right" />
        </Link>
      </section>
    </div>
  )
}
