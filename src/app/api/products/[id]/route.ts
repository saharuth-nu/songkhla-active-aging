import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { productServices } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { getAuthUser, requireAdmin } from "@/lib/auth/guard"

const updateSchema = z.object({
  itemName: z.string().optional(),
  itemType: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  partnerId: z.string().optional(),
  providerName: z.string().optional(),
  area: z.string().optional(),
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
  priceNote: z.string().optional(),
  imageUrl: z.string().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().optional(),
})

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth
  const { id } = await params
  const [item] = await db.select().from(productServices).where(eq(productServices.id, id))
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ data: item })
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const parsed = updateSchema.parse(await req.json())
    const [item] = await db
      .update(productServices)
      .set({
        ...parsed,
        priceMin: parsed.priceMin?.toString(),
        priceMax: parsed.priceMax?.toString(),
        updatedAt: new Date(),
      })
      .where(eq(productServices.id, id))
      .returning()
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: item })
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  const { id } = await params
  await db
    .update(productServices)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(productServices.id, id))
  return NextResponse.json({ message: "Product deactivated" })
}
