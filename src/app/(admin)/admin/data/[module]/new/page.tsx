import { notFound } from "next/navigation"
import { AdminRecordFormPage } from "@/features/admin/components/AdminRecordFormPage"
import { adminModules, type AdminModuleKey } from "@/features/admin/mocks/admin-data"

export default async function Page({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params
  if (!(module in adminModules)) notFound()
  return <AdminRecordFormPage module={module as AdminModuleKey} />
}
