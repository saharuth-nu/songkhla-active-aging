import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { productServices, partners } from "@/lib/db/schema"
import { eq, ilike, and } from "drizzle-orm"

// Public — no auth required
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search")
    const itemType = searchParams.get("itemType")
    const area = searchParams.get("area")

    const conditions = [eq(productServices.isActive, true)]
    if (search) conditions.push(ilike(productServices.itemName, `%${search}%`))
    if (itemType) conditions.push(eq(productServices.itemType, itemType))
    if (area) conditions.push(eq(productServices.area, area))

    const result = await db.select({
      id: productServices.id,
      itemName: productServices.itemName,
      itemType: productServices.itemType,
      category: productServices.category,
      description: productServices.description,
      partnerName: partners.organizationName,
      providerName: productServices.providerName,
      area: productServices.area,
      priceMin: productServices.priceMin,
      priceMax: productServices.priceMax,
      priceNote: productServices.priceNote,
      imageUrl: productServices.imageUrl,
      sortOrder: productServices.sortOrder,
    }).from(productServices)
      .leftJoin(partners, eq(productServices.partnerId, partners.id))
      .where(and(...conditions))
      .orderBy(productServices.sortOrder, productServices.createdAt)

    return NextResponse.json({ data: result })
  } catch {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
