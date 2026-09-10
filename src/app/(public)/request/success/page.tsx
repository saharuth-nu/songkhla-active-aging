import { RequestSuccessView } from "@/features/public/registration/ServiceFlowViews"

export default async function Page({ searchParams }: { searchParams: Promise<{ code?: string }> }) {
  const { code } = await searchParams
  return <RequestSuccessView code={code} />
}
