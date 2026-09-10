import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { productServices, partners } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"

// Public — no auth required
export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const [item] = await db
      .select({
        id: productServices.id,
        itemName: productServices.itemName,
        itemType: productServices.itemType,
        category: productServices.category,
        description: productServices.description,
        partnerId: productServices.partnerId,
        partnerName: partners.organizationName,
        providerName: productServices.providerName,
        area: productServices.area,
        priceMin: productServices.priceMin,
        priceMax: productServices.priceMax,
        priceNote: productServices.priceNote,
        imageUrl: productServices.imageUrl,
      })
      .from(productServices)
      .leftJoin(partners, eq(productServices.partnerId, partners.id))
      .where(and(eq(productServices.id, id), eq(productServices.isActive, true)))

    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: item })
  } catch {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}
