"use client"

import { useState } from "react"

export function useAdminNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  return {
    close: () => setIsOpen(false),
    isOpen,
    open: () => setIsOpen(true),
  }
}
