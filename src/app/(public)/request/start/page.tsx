import { services } from "@/features/public/mocks/public-data"
import { RequestEntryView, ServiceFlowState } from "@/features/public/registration/ServiceFlowViews"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    campaign?: string
    intent?: string
    item?: string
    source?: string
    utm_campaign?: string
    utm_content?: string
    utm_medium?: string
    utm_source?: string
    utm_term?: string
  }>
}) {
  const query = await searchParams
  const service = services.find((item) => item.id === query.item)
  if (service) {
    const params = new URLSearchParams({
      item: service.id,
      intent: query.intent || service.action,
      source: query.source || "Website",
    })
    for (const [key, value] of Object.entries({
      campaign: query.campaign,
      utm_campaign: query.utm_campaign,
      utm_content: query.utm_content,
      utm_medium: query.utm_medium,
      utm_source: query.utm_source,
      utm_term: query.utm_term,
    })) {
      if (value) params.set(key, value)
    }
    return <RequestEntryView nextHref={`/request/new?${params.toString()}`} service={service} />
  }
  return (
    <ServiceFlowState
      action="ดูสินค้าและบริการ"
      href="/products"
      message="กรุณาเลือกรายการก่อนเริ่มคำขอ"
      title="ยังไม่ได้เลือกสินค้าและบริการ"
    />
  )
}
