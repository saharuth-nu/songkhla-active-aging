import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

type ButtonStyleProps = {
  children: ReactNode
  className?: string
  icon?: ReactNode
  mode?: "public" | "workspace"
  onDark?: boolean
  variant?: "primary" | "secondary" | "danger"
}

export type ButtonProps = ButtonStyleProps & ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonLinkProps = ButtonStyleProps & AnchorHTMLAttributes<HTMLAnchorElement>

function buttonClassName({
  className,
  mode = "public",
  onDark = false,
  variant = "primary",
}: Pick<ButtonStyleProps, "className" | "mode" | "onDark" | "variant">) {
  return cn(
    "ui-button",
    `ui-button--${variant}`,
    mode === "workspace" && "ui-button--workspace",
    onDark && "ui-button--on-dark",
    className,
  )
}

function ButtonContent({ children, icon }: Pick<ButtonStyleProps, "children" | "icon">) {
  return (
    <>
      <span>{children}</span>
      {icon ? <span className="ui-button__icon">{icon}</span> : null}
    </>
  )
}

export function Button({
  children,
  className,
  icon,
  mode,
  onDark,
  type = "button",
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClassName({ className, mode, onDark, variant })}
      type={type}
      {...props}
    >
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </button>
  )
}

export function ButtonLink({
  children,
  className,
  icon,
  mode,
  onDark,
  variant,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={buttonClassName({ className, mode, onDark, variant })} {...props}>
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </a>
  )
}
