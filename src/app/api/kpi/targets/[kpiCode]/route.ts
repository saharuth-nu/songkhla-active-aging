import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { kpiTargets } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { requireAdmin } from "@/lib/auth/guard"

const updateSchema = z.object({
  kpiName: z.string().optional(),
  kpiDescription: z.string().optional(),
  targetValue: z.number(),
  targetUnit: z.string().optional(),
  isActive: z.boolean().optional(),
})

// PUT /api/kpi/targets/[kpiCode] — update KPI target value (admin only)
export async function PUT(req: NextRequest, { params }: { params: Promise<{ kpiCode: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { kpiCode } = await params
    const parsed = updateSchema.parse(await req.json())
    const [item] = await db.update(kpiTargets)
      .set({ ...parsed, targetValue: parsed.targetValue.toString(), updatedAt: new Date() })
      .where(eq(kpiTargets.kpiCode, kpiCode))
      .returning()
    if (!item) return NextResponse.json({ error: "KPI not found" }, { status: 404 })
    return NextResponse.json({ data: item })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to update KPI target" }, { status: 500 })
  }
}
