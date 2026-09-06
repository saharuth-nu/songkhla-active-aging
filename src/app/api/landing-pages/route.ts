import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { landingPages } from "@/lib/db/schema"
import { getAuthUser, requireAdmin } from "@/lib/auth/guard"
import { eq, and } from "drizzle-orm"
import { nanoid } from "nanoid"
import { z } from "zod"

const createSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "slug ต้องเป็นตัวเล็กภาษาอังกฤษ ตัวเลข หรือ - เท่านั้น"),
  campaignName: z.string().min(1),
  headline: z.string().optional(),
  subheadline: z.string().optional(),
  bodyText: z.string().optional(),
  imageUrl: z.string().optional(),
  linkedItemIds: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  ctaText: z.string().optional(),
  ctaUrl: z.string().optional(),
  isActive: z.boolean().optional(),
  publishDate: z.string().optional(),
  expiryDate: z.string().optional(),
})

export async function GET(req: NextRequest) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(req.url)
  const search = searchParams.get("search")
  const isActive = searchParams.get("isActive")

  const conditions: ReturnType<typeof eq>[] = []
  if (isActive !== null) conditions.push(eq(landingPages.isActive, isActive === "true"))

  let rows = await db
    .select()
    .from(landingPages)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(landingPages.createdAt)

  if (search) {
    rows = rows.filter(
      (r) =>
        r.campaignName.toLowerCase().includes(search.toLowerCase()) ||
        r.slug.toLowerCase().includes(search.toLowerCase())
    )
  }

  return NextResponse.json({ data: rows })
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth

  try {
    const body = await req.json()
    const parsed = createSchema.parse(body)

    // Check slug uniqueness
    const [existing] = await db
      .select({ id: landingPages.id })
      .from(landingPages)
      .where(eq(landingPages.slug, parsed.slug))
    if (existing) {
      return NextResponse.json({ error: "slug นี้ถูกใช้แล้ว" }, { status: 409 })
    }

    const id = `LP-${nanoid(8).toUpperCase()}`
    const [row] = await db
      .insert(landingPages)
      .values({ id, ...parsed })
      .returning()

    return NextResponse.json({ data: row }, { status: 201 })
  } catch (e) {
    if (e instanceof z.ZodError) return NextResponse.json({ error: e.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to create landing page" }, { status: 500 })
  }
}
