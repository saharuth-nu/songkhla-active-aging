import { PublicShell } from "@/features/public/components/PublicShell"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <PublicShell>{children}</PublicShell>
}
