import * as Label from "@radix-ui/react-label"
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react"
import { useId } from "react"
import { cn } from "@/lib/utils"

type FieldBaseProps = {
  error?: string
  hint?: string
  label: string
  mode?: "public" | "workspace"
}

export type InputFieldProps = FieldBaseProps & InputHTMLAttributes<HTMLInputElement>

export function InputField({
  className,
  error,
  hint,
  id,
  label,
  mode = "public",
  required,
  ...props
}: InputFieldProps) {
  const generatedId = useId()
  const controlId = id ?? generatedId
  const descriptionId = hint || error ? `${controlId}-description` : undefined

  return (
    <div className={cn("ui-field", mode === "workspace" && "ui-field--workspace", className)}>
      <Label.Root className="ui-field__label" htmlFor={controlId}>
        {label}{" "}
        {required ? (
          <span className="ui-field__required" aria-hidden="true">
            *
          </span>
        ) : null}
      </Label.Root>
      <input
        aria-describedby={descriptionId}
        aria-invalid={error ? true : undefined}
        id={controlId}
        required={required}
        {...props}
      />
      {error ? (
        <span className="ui-field__error" id={descriptionId}>
          {error}
        </span>
      ) : hint ? (
        <small className="ui-field__hint" id={descriptionId}>
          {hint}
        </small>
      ) : null}
    </div>
  )
}

export type TextareaFieldProps = FieldBaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>

export function TextareaField({
  className,
  error,
  hint,
  id,
  label,
  mode = "public",
  required,
  ...props
}: TextareaFieldProps) {
  const generatedId = useId()
  const controlId = id ?? generatedId
  const descriptionId = hint || error ? `${controlId}-description` : undefined

  return (
    <div className={cn("ui-field", mode === "workspace" && "ui-field--workspace", className)}>
      <Label.Root className="ui-field__label" htmlFor={controlId}>
        {label}{" "}
        {required ? (
          <span className="ui-field__required" aria-hidden="true">
            *
          </span>
        ) : null}
      </Label.Root>
      <textarea
        aria-describedby={descriptionId}
        aria-invalid={error ? true : undefined}
        id={controlId}
        required={required}
        {...props}
      />
      {error ? (
        <span className="ui-field__error" id={descriptionId}>
          {error}
        </span>
      ) : hint ? (
        <small className="ui-field__hint" id={descriptionId}>
          {hint}
        </small>
      ) : null}
    </div>
  )
}

export type SelectFieldProps = FieldBaseProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: ReadonlyArray<{ disabled?: boolean; label: string; value: string }>
  }

export function SelectField({
  className,
  error,
  hint,
  id,
  label,
  mode = "public",
  options,
  required,
  ...props
}: SelectFieldProps) {
  const generatedId = useId()
  const controlId = id ?? generatedId
  const descriptionId = hint || error ? `${controlId}-description` : undefined

  return (
    <div className={cn("ui-field", mode === "workspace" && "ui-field--workspace", className)}>
      <Label.Root className="ui-field__label" htmlFor={controlId}>
        {label}{" "}
        {required ? (
          <span className="ui-field__required" aria-hidden="true">
            *
          </span>
        ) : null}
      </Label.Root>
      <select
        aria-describedby={descriptionId}
        aria-invalid={error ? true : undefined}
        id={controlId}
        required={required}
        {...props}
      >
        {options.map((option) => (
          <option disabled={option.disabled} key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <span className="ui-field__error" id={descriptionId}>
          {error}
        </span>
      ) : hint ? (
        <small className="ui-field__hint" id={descriptionId}>
          {hint}
        </small>
      ) : null}
    </div>
  )
}
