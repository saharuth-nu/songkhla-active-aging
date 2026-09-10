import { ViewerShell } from "@/features/admin/components/ViewerShell"
export default function Layout({ children }: { children: React.ReactNode }) {
  return <ViewerShell>{children}</ViewerShell>
}
