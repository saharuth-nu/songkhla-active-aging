import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { productServices } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"

// Public — health services list (item_type = 'health_service')
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const area = searchParams.get("area")

    const conditions = [
      eq(productServices.isActive, true),
      eq(productServices.itemType, "health_service"),
    ]
    if (area) conditions.push(eq(productServices.area, area))

    const rows = await db
      .select({
        id: productServices.id,
        itemName: productServices.itemName,
        itemType: productServices.itemType,
        category: productServices.category,
        description: productServices.description,
        providerName: productServices.providerName,
        area: productServices.area,
        priceMin: productServices.priceMin,
        priceMax: productServices.priceMax,
        priceNote: productServices.priceNote,
        imageUrl: productServices.imageUrl,
        sortOrder: productServices.sortOrder,
      })
      .from(productServices)
      .where(and(...conditions))
      .orderBy(productServices.sortOrder)

    return NextResponse.json({ data: rows })
  } catch {
    return NextResponse.json({ error: "Failed to fetch health services" }, { status: 500 })
  }
}
