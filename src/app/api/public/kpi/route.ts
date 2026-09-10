import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { kpiTargets } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

// Public — KPI summary for /impact page, no auth required
export async function GET() {
  try {
    const targets = await db
      .select({
        kpiCode: kpiTargets.kpiCode,
        kpiName: kpiTargets.kpiName,
        targetValue: kpiTargets.targetValue,
        targetUnit: kpiTargets.targetUnit,
        sortOrder: kpiTargets.sortOrder,
      })
      .from(kpiTargets)
      .where(eq(kpiTargets.isActive, true))
      .orderBy(kpiTargets.sortOrder)

    return NextResponse.json({ data: targets })
  } catch {
    return NextResponse.json({ error: "Failed to fetch KPI targets" }, { status: 500 })
  }
}
