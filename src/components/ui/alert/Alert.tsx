import { ShieldCheck, X } from "lucide-react"
import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  message?: string
  title: string
  variant?: "info" | "danger"
}

export function Alert({ className, message, title, variant = "info", ...props }: AlertProps) {
  const Icon = variant === "danger" ? X : ShieldCheck

  return (
    <div
      className={cn("ui-alert", variant === "danger" && "ui-alert--danger", className)}
      role={variant === "danger" ? "alert" : "status"}
      {...props}
    >
      <Icon aria-hidden="true" className="ui-alert__icon" />
      <div>
        <strong>{title}</strong>
        {message ? <p>{message}</p> : null}
      </div>
    </div>
  )
}
