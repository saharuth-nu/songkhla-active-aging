import type { InputHTMLAttributes } from "react"
import { useId } from "react"
import { cn } from "@/lib/utils"

export type CheckboxFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  description?: string
  label: string
}

export function CheckboxField({ className, description, id, label, ...props }: CheckboxFieldProps) {
  const generatedId = useId()
  const controlId = id ?? generatedId

  return (
    <label className={cn("ui-checkbox", className)} htmlFor={controlId}>
      <input id={controlId} type="checkbox" {...props} />
      <span className="ui-checkbox__copy">
        <strong>{label}</strong>
        {description ? <small>{description}</small> : null}
      </span>
    </label>
  )
}
