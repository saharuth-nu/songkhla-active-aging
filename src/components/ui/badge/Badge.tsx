import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
  variant?: "service" | "innovation" | "content"
}

export function Badge({ children, className, variant = "service", ...props }: BadgeProps) {
  return (
    <span
      className={cn("ui-badge", variant !== "service" && `ui-badge--${variant}`, className)}
      {...props}
    >
      {children}
    </span>
  )
}

export type Status = "pending" | "confirmed" | "completed" | "cancelled"

const statusLabels: Record<Status, string> = {
  pending: "รอตรวจสอบ",
  confirmed: "ยืนยันแล้ว",
  completed: "เสร็จสิ้น",
  cancelled: "ยกเลิก",
}

export type StatusBadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  label?: string
  status: Status
}

export function StatusBadge({ className, label, status, ...props }: StatusBadgeProps) {
  return (
    <span className={cn("ui-status-badge", `ui-status-badge--${status}`, className)} {...props}>
      {label ?? statusLabels[status]}
    </span>
  )
}
