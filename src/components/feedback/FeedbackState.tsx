import { Button } from "@/components/ui/button/Button"
import { cn } from "@/lib/utils"

export type FeedbackStateKind = "loading" | "empty" | "error"

const content: Record<FeedbackStateKind, { description: string; mark: string; title: string }> = {
  loading: {
    description: "กำลังเตรียมข้อมูลสำหรับพื้นที่ทำงานนี้",
    mark: "…",
    title: "กำลังโหลดข้อมูล",
  },
  empty: {
    description: "ยังไม่มีรายการที่ตรงกับตัวกรองหรือขอบเขตที่เลือก",
    mark: "0",
    title: "ยังไม่มีข้อมูล",
  },
  error: {
    description: "เกิดข้อผิดพลาด กรุณาลองอีกครั้ง",
    mark: "!",
    title: "ไม่สามารถแสดงข้อมูลได้",
  },
}

export type FeedbackStateProps = {
  className?: string
  description?: string
  kind: FeedbackStateKind
  onRetry?: () => void
  title?: string
}

export function FeedbackState({
  className,
  description,
  kind,
  onRetry,
  title,
}: FeedbackStateProps) {
  const state = content[kind]

  return (
    <section aria-live="polite" className={cn("ui-feedback-state", className)}>
      <span aria-hidden="true" className="ui-feedback-state__mark">
        {state.mark}
      </span>
      <div>
        <h2>{title ?? state.title}</h2>
        <p>{description ?? state.description}</p>
        {kind === "error" && onRetry ? (
          <Button mode="workspace" onClick={onRetry} variant="secondary">
            ลองอีกครั้ง
          </Button>
        ) : null}
      </div>
    </section>
  )
}
