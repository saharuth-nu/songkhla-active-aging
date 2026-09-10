"use client"

import Link from "next/link"
import { Button, ButtonLink } from "@/components/ui"
import { Breadcrumbs } from "../components/Breadcrumbs"
import { CatalogCard } from "../components/CatalogCard"
import { PublicIcon } from "../components/PublicIcon"
import { ResponsiveImage } from "../components/ResponsiveImage"
import { useMarketplaceFilters } from "../hooks/useMarketplaceFilters"
import { areas, services } from "../mocks/public-data"
import { actionFor, queryPath, type MarketplaceQuery } from "./marketplace"

const heroImage = {
  id: "MKT-HERO-01",
  src: "/img/MKT-HERO-01.png",
  width: 1536,
  height: 1024,
  alt: "ผู้สูงอายุเลือกสินค้าและบริการที่เหมาะกับการใช้ชีวิตในชุมชน",
}

export function MarketplacePageContainer({
  healthOnly,
  query,
}: {
  healthOnly: boolean
  query: MarketplaceQuery
}) {
  const basePath = healthOnly ? "/health-services" : "/products"
  const handlers = useMarketplaceFilters(basePath)
  return (
    <MarketplacePageView
      basePath={basePath}
      handlers={handlers}
      healthOnly={healthOnly}
      query={query}
    />
  )
}

function MarketplacePageView({
  basePath,
  handlers,
  healthOnly,
  query,
}: {
  basePath: string
  handlers: ReturnType<typeof useMarketplaceFilters>
  healthOnly: boolean
  query: MarketplaceQuery
}) {
  const scoped = services.filter((item) => !healthOnly || item.type.includes("สุขภาพ"))
  const categories = [...new Set(scoped.map((item) => item.type))]
  const selectedTypes = (query.type ?? "").split(",").filter(Boolean)
  const minPrice = query.minPrice ? Number(query.minPrice) : null
  const maxPrice = query.maxPrice ? Number(query.maxPrice) : null
  const search = (query.q ?? "").trim().toLocaleLowerCase("th-TH")
  const results = scoped.filter((item) => {
    const text = [item.title, item.type, item.provider, item.area, item.excerpt]
      .join(" ")
      .toLocaleLowerCase("th-TH")
    const matchesPrice =
      (minPrice === null && maxPrice === null) ||
      (item.priceValue !== null &&
        (minPrice === null || item.priceValue >= minPrice) &&
        (maxPrice === null || item.priceValue <= maxPrice))
    return (
      (!search || text.includes(search)) &&
      (!selectedTypes.length || selectedTypes.includes(item.type)) &&
      (!query.area || item.areaId === query.area) &&
      matchesPrice
    )
  })
  const sort = query.sort ?? "recommended"
  if (sort === "name") results.sort((a, b) => a.title.localeCompare(b.title, "th"))
  if (sort === "price-low")
    results.sort((a, b) => (a.priceValue ?? Infinity) - (b.priceValue ?? Infinity))
  if (sort === "price-high") results.sort((a, b) => (b.priceValue ?? -1) - (a.priceValue ?? -1))
  const view = query.view === "list" ? "list" : "grid"
  const title = healthOnly ? "บริการสุขภาพ" : "สินค้าและบริการ"
  const description = healthOnly
    ? "มุมมองกรองล่วงหน้าจาก Catalog เดียวกัน สำหรับบริการและกิจกรรมด้านสุขภาพ"
    : "ค้นหาสินค้า บริการสุขภาพ กิจกรรม และองค์ความรู้จากเครือข่าย Songkhla Active"

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="catalog-hero catalog-hero--photo" aria-labelledby="catalog-title">
        <div className="catalog-hero__media">
          <ResponsiveImage image={heroImage} />
        </div>
        <div className="site-container catalog-hero__inner">
          <div className="catalog-hero__copy">
            <h1 id="catalog-title">{title}</h1>
            <p>{description}</p>
          </div>
        </div>
      </section>
      <div className="site-container catalog-shell">
        <Breadcrumbs items={[{ href: "/", label: "หน้าแรก" }, { label: title }]} />
        {healthOnly ? (
          <aside className="catalog-preset-note">
            <PublicIcon name="heart-pulse" />
            <span>
              <strong>กำลังดูบริการสุขภาพ</strong> จาก Catalog สินค้าและบริการชุดเดียวกัน
            </span>
            <Link href="/products">ดูทั้งหมด</Link>
          </aside>
        ) : null}
        <div className="catalog-layout">
          <aside className="catalog-sidebar" aria-label="ตัวกรองสินค้าและบริการ">
            <form
              className="catalog-filter"
              action={basePath}
              method="get"
              onSubmit={handlers.submit}
            >
              <div className="catalog-filter__heading">
                <h2>ค้นหาและกรอง</h2>
                <Link href={basePath}>ล้างทั้งหมด</Link>
              </div>
              <label className="catalog-field">
                <span>ค้นหา</span>
                <input
                  defaultValue={query.q}
                  name="q"
                  placeholder="ชื่อสินค้าหรือบริการ"
                  type="search"
                />
              </label>
              <fieldset className="catalog-filter__group">
                <legend>หมวดหมู่</legend>
                <label className="catalog-filter__option">
                  <input
                    data-catalog-all-types
                    defaultChecked={!selectedTypes.length}
                    onChange={handlers.selectAll}
                    type="checkbox"
                    value=""
                  />
                  <span>{healthOnly ? "บริการสุขภาพทั้งหมด" : "ทั้งหมด"}</span>
                </label>
                {categories.map((type) => (
                  <label className="catalog-filter__option" key={type}>
                    <input
                      defaultChecked={selectedTypes.includes(type)}
                      name="type"
                      onChange={handlers.selectType}
                      type="checkbox"
                      value={type}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </fieldset>
              <label className="catalog-field">
                <span>พื้นที่</span>
                <select defaultValue={query.area ?? ""} name="area">
                  <option value="">ทุกพื้นที่</option>
                  {areas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.label}
                    </option>
                  ))}
                </select>
              </label>
              <fieldset className="catalog-filter__group">
                <legend>ช่วงราคาโดยประมาณ</legend>
                <div className="catalog-price-range">
                  <label>
                    <span>ต่ำสุด</span>
                    <input
                      defaultValue={query.minPrice}
                      inputMode="numeric"
                      min="0"
                      name="minPrice"
                      placeholder="0"
                      type="number"
                    />
                  </label>
                  <label>
                    <span>สูงสุด</span>
                    <input
                      defaultValue={query.maxPrice}
                      inputMode="numeric"
                      min="0"
                      name="maxPrice"
                      placeholder="ไม่จำกัด"
                      type="number"
                    />
                  </label>
                </div>
              </fieldset>
              <input name="sort" type="hidden" value={query.sort ?? ""} />
              <input name="view" type="hidden" value={query.view ?? ""} />
              <Button className="button" icon={<PublicIcon name="search" />} type="submit">
                ค้นหา
              </Button>
            </form>
          </aside>
          <section
            className={`catalog-results catalog-results--${view}`}
            aria-label="ผลการค้นหาสินค้าและบริการ"
          >
            <div className="catalog-toolbar">
              <p role="status">
                พบ <strong>{results.length}</strong> รายการ
              </p>
              <div className="catalog-toolbar__controls">
                <label className="catalog-sort">
                  <span>เรียงตาม</span>
                  <select onChange={handlers.sort} value={sort}>
                    <option value="recommended">แนะนำ</option>
                    <option value="name">ชื่อรายการ</option>
                    <option value="price-low">ราคาต่ำไปสูง</option>
                    <option value="price-high">ราคาสูงไปต่ำ</option>
                  </select>
                </label>
                <nav className="catalog-view" aria-label="รูปแบบการแสดงผล">
                  <Link
                    aria-current={view === "grid" ? "page" : undefined}
                    href={queryPath(basePath, query, { view: "grid" })}
                  >
                    ตาราง
                  </Link>
                  <Link
                    aria-current={view === "list" ? "page" : undefined}
                    href={queryPath(basePath, query, { view: "list" })}
                  >
                    รายการ
                  </Link>
                </nav>
              </div>
            </div>
            {results.length ? (
              <div className="catalog-grid">
                {results.map((item) => {
                  const action = actionFor(item)
                  return (
                    <CatalogCard
                      actionHref={action.href}
                      actionLabel={action.label}
                      detailHref={`/products/${item.id}${healthOnly ? "?from=health-services" : ""}`}
                      item={item}
                      key={item.id}
                    />
                  )
                })}
              </div>
            ) : (
              <section className="catalog-empty">
                <span aria-hidden="true">0</span>
                <h2>ไม่พบรายการที่ตรงกับตัวกรอง</h2>
                <p>ลองเปลี่ยนคำค้น หมวดหมู่ พื้นที่ หรือช่วงราคา</p>
                <ButtonLink
                  className="button button--secondary"
                  href={basePath}
                  variant="secondary"
                >
                  ล้างตัวกรอง
                </ButtonLink>
              </section>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
