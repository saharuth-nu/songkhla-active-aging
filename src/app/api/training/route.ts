import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { trainings } from "@/lib/db/schema"
import { eq, and, gte, lte } from "drizzle-orm"
import { z } from "zod"
import { nanoid } from "@/lib/utils/nanoid"
import { getAuthUser, requireAdmin } from "@/lib/auth/guard"

const createSchema = z.object({
  title: z.string().min(1),
  trainingType: z.string().optional(),
  participantId: z.string().optional(),
  participantCode: z.string().optional(),
  participantName: z.string().optional(),
  participantType: z.enum(["elderly", "caregiver", "health_personnel", "entrepreneur"]).optional(),
  organization: z.string().optional(),
  area: z.string().optional(),
  trainingDate: z.string(),
  location: z.string().optional(),
  durationHours: z.number().optional(),
  preScore: z.number().optional(),
  postScore: z.number().optional(),
  passStatus: z.enum(["pass", "fail", "n/a"]).optional(),
  evidenceUrl: z.string().optional(),
})

export async function GET(req: NextRequest) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth
  try {
    const { searchParams } = new URL(req.url)
    const participantType = searchParams.get("participantType")
    const area = searchParams.get("area")
    const dateFrom = searchParams.get("dateFrom")
    const dateTo = searchParams.get("dateTo")

    const conditions = []
    if (participantType) conditions.push(eq(trainings.participantType, participantType))
    if (area) conditions.push(eq(trainings.area, area))
    if (dateFrom) conditions.push(gte(trainings.trainingDate, dateFrom))
    if (dateTo) conditions.push(lte(trainings.trainingDate, dateTo))

    const result = await db
      .select()
      .from(trainings)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(trainings.trainingDate)

    return NextResponse.json({ data: result, total: result.length })
  } catch {
    return NextResponse.json({ error: "Failed to fetch trainings" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const body = await req.json()
    const parsed = createSchema.parse(body)

    const [item] = await db
      .insert(trainings)
      .values({
        id: `TRN-${nanoid()}`,
        ...parsed,
        durationHours: parsed.durationHours?.toString(),
        preScore: parsed.preScore?.toString(),
        postScore: parsed.postScore?.toString(),
      })
      .returning()

    return NextResponse.json({ data: item }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to create training" }, { status: 500 })
  }
}
