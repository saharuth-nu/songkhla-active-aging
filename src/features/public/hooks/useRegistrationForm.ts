"use client"

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState, type FormEvent } from "react"
import {
  createRegistration,
  getRegistration,
  type RegistrationRecord,
} from "../registration/service-flow-store"

export function useRegistrationForm() {
  const router = useRouter()
  const feedbackRef = useRef<HTMLDivElement>(null)
  const [feedback, setFeedback] = useState<{ message: string; title: string }>()
  const [submitting, setSubmitting] = useState(false)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    if (!values.get("consent")) {
      setFeedback({
        title: "ยังไม่สามารถลงทะเบียนได้",
        message: "กรุณาอ่านและยืนยันความยินยอมก่อนบันทึกข้อมูล",
      })
      requestAnimationFrame(() => feedbackRef.current?.focus())
      return
    }
    if (values.get("simulateError")) {
      setFeedback({
        title: "บันทึกไม่สำเร็จ (จำลอง)",
        message: "ยังไม่มีข้อมูลถูกบันทึก ปิดตัวเลือกทดสอบแล้วลองอีกครั้ง",
      })
      requestAnimationFrame(() => feedbackRef.current?.focus())
      return
    }
    setSubmitting(true)
    const record = createRegistration({
      ageGroup: String(values.get("ageGroup")),
      areaId: String(values.get("areaId")),
      beneficiaryType: String(values.get("beneficiaryType")),
      contact: String(values.get("contact") || "").trim(),
      gender: String(values.get("gender")),
      serviceId: String(values.get("serviceId")),
      serviceRelationship: String(values.get("serviceRelationship")),
    })
    router.push(`/register/success?code=${record.code}`)
  }

  return { feedback, feedbackRef, submit, submitting }
}

export function useStoredRegistration(code = "") {
  const [record, setRecord] = useState<RegistrationRecord | null>()
  useEffect(() => setRecord(getRegistration(code) ?? null), [code])
  return record
}
