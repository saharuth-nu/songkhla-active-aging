import { AdminCampaignFormView } from "@/features/admin/operations/AdminOperationDetailViews"
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <AdminCampaignFormView id={id} />
}
