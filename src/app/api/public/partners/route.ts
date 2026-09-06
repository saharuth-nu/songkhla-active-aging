import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { partners } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"

// Public — no auth required
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const area = searchParams.get("area")
    const partnerType = searchParams.get("partnerType")

    const conditions = [eq(partners.isActive, true)]
    if (area) conditions.push(eq(partners.area, area))
    if (partnerType) conditions.push(eq(partners.partnerType, partnerType))

    const result = await db.select({
      id: partners.id,
      organizationName: partners.organizationName,
      partnerType: partners.partnerType,
      networkName: partners.networkName,
      area: partners.area,
      agreementType: partners.agreementType,
      contactPerson: partners.contactPerson,
    }).from(partners).where(and(...conditions)).orderBy(partners.organizationName)

    return NextResponse.json({ data: result })
  } catch {
    return NextResponse.json({ error: "Failed to fetch partners" }, { status: 500 })
  }
}
