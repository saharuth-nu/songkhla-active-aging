import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { innovations } from "@/lib/db/schema"
import { eq, and, SQL } from "drizzle-orm"

// Public — no auth required
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const area = searchParams.get("area")
    const innovationType = searchParams.get("innovationType")

    const conditions: SQL[] = []
    if (area) conditions.push(eq(innovations.area, area))
    if (innovationType) conditions.push(eq(innovations.innovationType, innovationType))

    const result = await db.select({
      id: innovations.id,
      innovationName: innovations.innovationName,
      innovationType: innovations.innovationType,
      category: innovations.category,
      description: innovations.description,
      area: innovations.area,
      usageStatus: innovations.usageStatus,
    }).from(innovations)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(innovations.createdAt)

    return NextResponse.json({ data: result })
  } catch {
    return NextResponse.json({ error: "Failed to fetch innovations" }, { status: 500 })
  }
}
