import { notFound } from "next/navigation"
import { AdminListPage } from "@/features/admin/components/AdminListPage"
import { adminModules, type AdminModuleKey } from "@/features/admin/mocks/admin-data"

export default async function Page({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params
  if (!(module in adminModules)) notFound()
  return <AdminListPage module={module as AdminModuleKey} />
}
