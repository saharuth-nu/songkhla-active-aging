"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"

export function usePublicNavigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const firstSegment = pathname.split("/")[1]
  const activeKey =
    pathname === "/"
      ? "home"
      : firstSegment === "health-services" || firstSegment === "products"
        ? "products"
        : firstSegment

  return {
    activeKey,
    close: () => setIsOpen(false),
    isOpen,
    toggle: () => setIsOpen((current) => !current),
  }
}
