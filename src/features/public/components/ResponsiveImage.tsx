import type { PublicImage } from "../mocks/public-data"

export function ResponsiveImage({ hero = false, image }: { hero?: boolean; image: PublicImage }) {
  return (
    <picture
      className={hero ? "responsive-image responsive-image--hero" : "responsive-image"}
      data-image-id={image.id}
    >
      {image.mobileSrc ? <source media="(max-width: 39.99rem)" srcSet={image.mobileSrc} /> : null}
      <img
        alt={image.alt}
        decoding="async"
        fetchPriority={hero ? "high" : undefined}
        height={image.height}
        loading={hero ? "eager" : "lazy"}
        src={image.src}
        width={image.width}
      />
    </picture>
  )
}

export function ImagePlaceholder({ id, label }: { id: string; label: string }) {
  return (
    <div className="image-placeholder" data-image-id={id} role="img" aria-label={label}>
      <div>
        <strong>ยังไม่มีรูปภาพ</strong>
        <span>จะเพิ่มรูปภาพในภายหลัง</span>
      </div>
    </div>
  )
}
