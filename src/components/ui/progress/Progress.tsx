"use client"

import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

export type ProgressProps = {
  className?: string
  label: string
  value: number
}

export function Progress({ className, label, value }: ProgressProps) {
  const safeValue = Math.min(Math.max(value, 0), 100)

  return (
    <ProgressPrimitive.Root
      aria-label={label}
      className={cn("ui-progress", className)}
      value={safeValue}
    >
      <ProgressPrimitive.Indicator
        className="ui-progress__indicator"
        style={{ transform: `translateX(-${100 - safeValue}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}
