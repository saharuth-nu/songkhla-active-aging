import { services } from "@/features/public/mocks/public-data"
import {
  RequestFormView,
  ServiceFlowState,
  type RequestTracking,
} from "@/features/public/registration/ServiceFlowViews"

type RequestQuery = {
  campaign?: string
  intent?: string
  item?: string
  source?: string
  utm_campaign?: string
  utm_content?: string
  utm_medium?: string
  utm_source?: string
  utm_term?: string
}

export default async function Page({ searchParams }: { searchParams: Promise<RequestQuery> }) {
  const query = await searchParams
  const service = services.find((item) => item.id === query.item)
  if (service) {
    const tracking: RequestTracking = {
      campaign: query.campaign,
      intent: query.intent,
      source: query.source,
      utmCampaign: query.utm_campaign,
      utmContent: query.utm_content,
      utmMedium: query.utm_medium,
      utmSource: query.utm_source,
      utmTerm: query.utm_term,
    }
    return <RequestFormView service={service} tracking={tracking} />
  }
  return (
    <ServiceFlowState
      action="ดูสินค้าและบริการ"
      href="/products"
      message="กรุณาเลือกรายการที่ต้องการก่อนเริ่มสร้างคำขอ"
      title="ยังไม่ได้เลือกสินค้าและบริการ"
    />
  )
}
