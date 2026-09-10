import type { Service } from "../mocks/public-data"

export type MarketplaceQuery = {
  area?: string
  maxPrice?: string
  minPrice?: string
  q?: string
  sort?: string
  type?: string
  view?: string
}

export function actionFor(item: Service) {
  if (item.action === "contact") {
    return {
      label: "สอบถามบริการ",
      href: `/contact?subject=${encodeURIComponent(`สอบถามบริการ: ${item.title}`)}&source=Website`,
    }
  }
  return {
    label: item.action === "order" ? "สั่งซื้อ" : "ขอรับบริการ",
    href: `/request/start?item=${encodeURIComponent(item.id)}&intent=${item.action}&source=Website`,
  }
}

export function queryPath(basePath: string, query: MarketplaceQuery, overrides: MarketplaceQuery) {
  const values = { ...query, ...overrides }
  const params = new URLSearchParams()
  for (const key of ["q", "type", "area", "minPrice", "maxPrice", "sort", "view"] as const) {
    const value = values[key]
    if (value) params.set(key, value)
  }
  const search = params.toString()
  return `${basePath}${search ? `?${search}` : ""}`
}
