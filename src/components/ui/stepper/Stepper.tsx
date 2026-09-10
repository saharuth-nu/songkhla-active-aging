import type { CSSProperties, HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export type StepperProps = Omit<HTMLAttributes<HTMLOListElement>, "children"> & {
  current: number
  items: ReadonlyArray<string>
  label?: string
}

export function Stepper({
  className,
  current,
  items,
  label = "ขั้นตอนการดำเนินการ",
  style,
  ...props
}: StepperProps) {
  const stepStyle = { ...style, "--step-count": items.length || 1 } as CSSProperties

  return (
    <ol aria-label={label} className={cn("ui-stepper", className)} style={stepStyle} {...props}>
      {items.map((item, index) => {
        const step = index + 1
        const state = step < current ? "complete" : step === current ? "current" : "upcoming"

        return (
          <li
            aria-current={state === "current" ? "step" : undefined}
            className={`ui-stepper__item ui-stepper__item--${state}`}
            key={item}
          >
            <span className="ui-stepper__marker" aria-hidden="true">
              {state === "complete" ? "✓" : step}
            </span>
            <small>{item}</small>
          </li>
        )
      })}
    </ol>
  )
}
