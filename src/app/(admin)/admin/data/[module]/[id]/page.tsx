import { notFound } from "next/navigation"
import { AdminRecordFormPage } from "@/features/admin/components/AdminRecordFormPage"
import { adminModules, type AdminModuleKey } from "@/features/admin/mocks/admin-data"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; module: string }>
}) {
  const { id, module } = await params
  if (!(module in adminModules)) notFound()
  return <AdminRecordFormPage id={id} module={module as AdminModuleKey} />
}
