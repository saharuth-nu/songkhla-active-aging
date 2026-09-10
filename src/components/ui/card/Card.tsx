import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export type CardProps = HTMLAttributes<HTMLElement> & {
  mode?: "public" | "workspace"
}

export function Card({ className, mode = "public", ...props }: CardProps) {
  return (
    <article
      className={cn("ui-card", mode === "workspace" && "ui-card--workspace", className)}
      {...props}
    />
  )
}
