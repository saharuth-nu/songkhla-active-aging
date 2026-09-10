import type { PublicImage } from "../mocks/public-data"
import { cn } from "@/lib/utils"
import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs"
import { ResponsiveImage } from "./ResponsiveImage"

export function PageHero({
  breadcrumbs,
  description,
  image,
  title,
}: {
  breadcrumbs?: ReadonlyArray<BreadcrumbItem>
  description: string
  image?: PublicImage
  title: string
}) {
  return (
    <>
      <header className={cn("page-hero", image && "page-hero--photo")}>
        {image ? (
          <>
            <div className="page-hero__media">
              <ResponsiveImage image={image} />
            </div>
            <div className="site-container page-hero__layout">
              <div className="page-hero__copy">
                <h1>{title}</h1>
                <p className="page-hero__lead">{description}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="site-container">
            <h1>{title}</h1>
            <p className="page-hero__lead">{description}</p>
          </div>
        )}
      </header>
      <div className="site-container page-hero__breadcrumbs">
        <Breadcrumbs items={breadcrumbs ?? [{ href: "/", label: "หน้าแรก" }, { label: title }]} />
      </div>
    </>
  )
}
