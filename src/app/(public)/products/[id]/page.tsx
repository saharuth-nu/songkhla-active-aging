import { MarketplaceDetailPageView } from "@/features/public/marketplace/MarketplaceDetailPageView"

export default async function ProductDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ from?: string }>
}) {
  const [{ id }, query] = await Promise.all([params, searchParams])
  return <MarketplaceDetailPageView fromHealth={query.from === "health-services"} id={id} />
}
