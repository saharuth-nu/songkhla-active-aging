import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { productServices, partners } from "@/lib/db/schema"
import { eq, ilike, and } from "drizzle-orm"
import { z } from "zod"
import { nanoid } from "@/lib/utils/nanoid"
import { getAuthUser, requireAdmin } from "@/lib/auth/guard"

const createSchema = z.object({
  itemName: z.string().min(1),
  itemType: z.enum(["product", "service", "health_service"]),
  category: z.string().optional(),
  description: z.string().optional(),
  partnerId: z.string().optional(),
  providerName: z.string().optional(),
  area: z.string().optional(),
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
  priceNote: z.string().optional(),
  imageUrl: z.string().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
})

export async function GET(req: NextRequest) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth
  try {
    const { searchParams } = new URL(req.url)
    const conditions = []
    const search = searchParams.get("search")
    const itemType = searchParams.get("itemType")
    const area = searchParams.get("area")
    const isActive = searchParams.get("isActive")
    if (search) conditions.push(ilike(productServices.itemName, `%${search}%`))
    if (itemType) conditions.push(eq(productServices.itemType, itemType))
    if (area) conditions.push(eq(productServices.area, area))
    if (isActive !== null) conditions.push(eq(productServices.isActive, isActive === "true"))
    const result = await db.select({
      id: productServices.id, itemName: productServices.itemName, itemType: productServices.itemType,
      category: productServices.category, description: productServices.description,
      partnerId: productServices.partnerId, partnerName: partners.organizationName,
      providerName: productServices.providerName, area: productServices.area,
      priceMin: productServices.priceMin, priceMax: productServices.priceMax,
      priceNote: productServices.priceNote, imageUrl: productServices.imageUrl,
      isActive: productServices.isActive, sortOrder: productServices.sortOrder,
      createdAt: productServices.createdAt,
    }).from(productServices)
      .leftJoin(partners, eq(productServices.partnerId, partners.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(productServices.sortOrder, productServices.createdAt)
    return NextResponse.json({ data: result })
  } catch {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const parsed = createSchema.parse(await req.json())
    const [item] = await db.insert(productServices).values({
      id: `PRD-${nanoid()}`, ...parsed,
      priceMin: parsed.priceMin?.toString(),
      priceMax: parsed.priceMax?.toString(),
    }).returning()
    return NextResponse.json({ data: item }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
