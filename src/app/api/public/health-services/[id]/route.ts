import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { productServices } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"

// Public — health service detail
export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const [item] = await db
      .select()
      .from(productServices)
      .where(
        and(
          eq(productServices.id, id),
          eq(productServices.isActive, true),
          eq(productServices.itemType, "health_service"),
        ),
      )

    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: item })
  } catch {
    return NextResponse.json({ error: "Failed to fetch health service" }, { status: 500 })
  }
}
