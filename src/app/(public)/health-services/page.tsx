import { MarketplacePageContainer } from "@/features/public/marketplace/MarketplacePageView"
import type { MarketplaceQuery } from "@/features/public/marketplace/marketplace"

export default async function HealthServicesPage({
  searchParams,
}: {
  searchParams: Promise<MarketplaceQuery>
}) {
  return <MarketplacePageContainer healthOnly query={await searchParams} />
}
