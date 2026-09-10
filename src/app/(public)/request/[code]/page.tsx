import { RequestStatusView } from "@/features/public/registration/ServiceFlowViews"

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  return <RequestStatusView code={code} />
}
