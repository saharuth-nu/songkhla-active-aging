import { PublicIcon } from "../components/PublicIcon"

export function FlowAlert({ message, title }: { message: string; title: string }) {
  return (
    <div className="flow-alert flow-alert--danger" role="alert">
      <PublicIcon name="x" />
      <div>
        <strong>{title}</strong>
        <p>{message}</p>
      </div>
    </div>
  )
}
