"use client"

import * as Tooltip from "@radix-ui/react-tooltip"
import type { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  icon: ReactNode
  label: string
  tooltip?: boolean
}

export function IconButton({
  className,
  icon,
  label,
  tooltip = false,
  type = "button",
  ...props
}: IconButtonProps) {
  const control = (
    <button aria-label={label} className={cn("ui-icon-button", className)} type={type} {...props}>
      {icon}
    </button>
  )

  if (!tooltip) return control

  return (
    <Tooltip.Provider delayDuration={300}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{control}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="ui-tooltip" sideOffset={8}>
            {label}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
