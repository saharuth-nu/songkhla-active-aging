"use client"

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState, type FormEvent } from "react"
import type { Service } from "../mocks/public-data"
import {
  createRequest,
  getRequest,
  getRequestDraft,
  saveRequestDraft,
  type RequestDraft,
  type RequestRecord,
} from "../registration/service-flow-store"

export type FlowFeedback = { message: string; title: string }

export function useRequestForm(service: Service) {
  const router = useRouter()
  const feedbackRef = useRef<HTMLDivElement>(null)
  const [feedback, setFeedback] = useState<FlowFeedback>()

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const values = new FormData(form)
    const consent = values.get("consent")
    if (!consent) {
      setFeedback({
        title: "ยังไม่สามารถตรวจสอบคำขอได้",
        message: "กรุณาอ่านประกาศความเป็นส่วนตัวและยืนยันความยินยอม",
      })
      requestAnimationFrame(() => feedbackRef.current?.focus())
      return
    }

    const quantity = Number(values.get("quantity")) || 1
    saveRequestDraft({
      amount: (service.priceValue ?? 0) * quantity,
      areaId: String(values.get("areaId") || service.areaId),
      campaign: String(values.get("campaign") || ""),
      consentAt: new Date().toISOString(),
      contact: String(values.get("contact") || "").trim(),
      evidence: values.get("evidence") ? "slip-demo.jpg" : null,
      intent: String(values.get("intent") || service.action),
      paymentDeclared: Boolean(values.get("paymentDeclared")),
      paymentMethod: String(values.get("paymentMethod") || ""),
      quantity,
      requesterName: String(values.get("requesterName") || "").trim(),
      serviceId: service.id,
      source: String(values.get("source") || "Website"),
      utmCampaign: String(values.get("utmCampaign") || ""),
      utmContent: String(values.get("utmContent") || ""),
      utmMedium: String(values.get("utmMedium") || ""),
      utmSource: String(values.get("utmSource") || ""),
      utmTerm: String(values.get("utmTerm") || ""),
    })
    router.push("/request/confirm")
  }

  return { feedback, feedbackRef, submit }
}

export function useRequestDraft() {
  const [draft, setDraft] = useState<RequestDraft | null>()
  useEffect(() => setDraft(getRequestDraft() ?? null), [])
  return draft
}

export function useConfirmRequest() {
  const router = useRouter()
  const draft = useRequestDraft()
  const feedbackRef = useRef<HTMLDivElement>(null)
  const [feedback, setFeedback] = useState<FlowFeedback>()
  const [submitting, setSubmitting] = useState(false)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!draft) return
    const values = new FormData(event.currentTarget)
    if (values.get("simulateError")) {
      setFeedback({
        title: "ยืนยันคำขอไม่สำเร็จ (จำลอง)",
        message: "Request และ Transaction ยังไม่ถูกสร้าง ปิดตัวเลือกทดสอบแล้วลองอีกครั้ง",
      })
      requestAnimationFrame(() => feedbackRef.current?.focus())
      return
    }
    setSubmitting(true)
    const request = createRequest(draft)
    router.push(`/request/success?code=${request.code}`)
  }

  return { draft, feedback, feedbackRef, submit, submitting }
}

export function useRequestLookup() {
  const router = useRouter()
  const feedbackRef = useRef<HTMLDivElement>(null)
  const [feedback, setFeedback] = useState<FlowFeedback>()

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const code = String(new FormData(event.currentTarget).get("code") || "")
      .trim()
      .toUpperCase()
    if (!/^REQ-\d{4}$/.test(code)) {
      setFeedback({
        title: "รูปแบบรหัสไม่ถูกต้อง",
        message: "กรุณากรอกรหัสในรูปแบบ REQ-0001",
      })
      requestAnimationFrame(() => feedbackRef.current?.focus())
      return
    }
    router.push(`/request/${encodeURIComponent(code)}`)
  }

  return { feedback, feedbackRef, submit }
}

export function useStoredRequest(code: string) {
  const [record, setRecord] = useState<RequestRecord | null>()
  useEffect(() => setRecord(getRequest(code) ?? null), [code])
  return record
}
