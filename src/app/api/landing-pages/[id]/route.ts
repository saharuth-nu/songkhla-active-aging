import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { landingPages } from "@/lib/db/schema"
import { getAuthUser, requireAdmin } from "@/lib/auth/guard"
import { eq } from "drizzle-orm"
import { z } from "zod"

const updateSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/).optional(),
  campaignName: z.string().min(1).optional(),
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

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth

  const { id } = await params
  const [row] = await db.select().from(landingPages).where(eq(landingPages.id, id))
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ data: row })
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth

  const { id } = await params
  try {
    const body = await req.json()
    const parsed = updateSchema.parse(body)

    if (parsed.slug) {
      const [existing] = await db
        .select({ id: landingPages.id })
        .from(landingPages)
        .where(eq(landingPages.slug, parsed.slug))
      if (existing && existing.id !== id) {
        return NextResponse.json({ error: "slug นี้ถูกใช้แล้ว" }, { status: 409 })
      }
    }

    const [row] = await db
      .update(landingPages)
      .set({ ...parsed, updatedAt: new Date() })
      .where(eq(landingPages.id, id))
      .returning()

    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: row })
  } catch (e) {
    if (e instanceof z.ZodError) return NextResponse.json({ error: e.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to update landing page" }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth

  const { id } = await params
  const [row] = await db.delete(landingPages).where(eq(landingPages.id, id)).returning()
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ message: "Deleted" })
}
