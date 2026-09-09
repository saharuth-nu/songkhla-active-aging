import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { kpiManualInputs, kpiTargets } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { getAuthUser, requireAdmin } from "@/lib/auth/guard"

const manualInputSchema = z.object({
  period: z.string().min(1),
  actualValue: z.number(),
  note: z.string().optional(),
  inputBy: z.string().optional(),
})

// GET /api/kpi/[kpiCode] — get target + manual inputs for one KPI
export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const [target] = await db.select().from(kpiTargets).where(eq(kpiTargets.kpiCode, id))
    const inputs = await db.select().from(kpiManualInputs).where(eq(kpiManualInputs.kpiCode, id))
    return NextResponse.json({ data: { target, inputs } })
  } catch {
    return NextResponse.json({ error: "Failed to fetch KPI" }, { status: 500 })
  }
}

// POST /api/kpi/[kpiCode] — add manual input
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const body = await req.json()
    const parsed = manualInputSchema.parse(body)

    const [input] = await db
      .insert(kpiManualInputs)
      .values({
        kpiCode: id,
        period: parsed.period,
        actualValue: parsed.actualValue.toString(),
        note: parsed.note,
        inputBy: parsed.inputBy,
      })
      .returning()

    return NextResponse.json({ data: input }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to save KPI input" }, { status: 500 })
  }
}
