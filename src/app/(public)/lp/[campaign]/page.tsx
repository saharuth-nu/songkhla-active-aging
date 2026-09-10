import { CampaignNotFoundView, CampaignPageView } from "@/features/public/campaign/CampaignPageView"
export default async function Page({ params }: { params: Promise<{ campaign: string }> }) {
  const { campaign } = await params
  return campaign === "active-aging" ? <CampaignPageView /> : <CampaignNotFoundView />
}
