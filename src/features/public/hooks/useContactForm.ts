"use client"

import { useRef, useState, type FormEvent } from "react"

export function useContactForm() {
  const feedbackRef = useRef<HTMLDivElement>(null)
  const [reference, setReference] = useState<string>()

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setReference(`MSG-${String(Date.now()).slice(-6)}`)
    requestAnimationFrame(() => feedbackRef.current?.focus())
  }

  return { feedbackRef, reference, submit }
}
