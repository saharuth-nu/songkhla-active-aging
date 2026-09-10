"use client"

import { useState } from "react"

export function useDisclosure(initial = false) {
  const [isOpen, setIsOpen] = useState(initial)
  return { isOpen, toggle: () => setIsOpen((current) => !current) }
}
