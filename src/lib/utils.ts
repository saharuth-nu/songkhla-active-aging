import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatThaiDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
  }).format(amount)
}

export function calculateProgress(actual: number, target: number): number {
  if (target === 0) return 0
  return Math.min(Math.round((actual / target) * 100), 100)
}

export function getKPIStatus(
  actual: number,
  target: number
): "achieved" | "on-track" | "at-risk" | "not-started" {
  const pct = calculateProgress(actual, target)
  if (pct >= 100) return "achieved"
  if (pct >= 60) return "on-track"
  if (pct > 0) return "at-risk"
  return "not-started"
}

export function generateId(prefix: string): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 7)
  return `${prefix}-${timestamp}-${random}`.toUpperCase()
}

// UTM parameter builder for campaign tracking
export function buildUTMUrl(
  baseUrl: string,
  params: {
    source: string
    medium: string
    campaign: string
    content?: string
  }
): string {
  const url = new URL(baseUrl)
  url.searchParams.set("utm_source", params.source)
  url.searchParams.set("utm_medium", params.medium)
  url.searchParams.set("utm_campaign", params.campaign)
  if (params.content) url.searchParams.set("utm_content", params.content)
  return url.toString()
}
