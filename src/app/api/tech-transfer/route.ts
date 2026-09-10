import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { techTransfers, innovations } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
import { z } from "zod"
import { nanoid } from "@/lib/utils/nanoid"
import { getAuthUser, requireAdmin } from "@/lib/auth/guard"

const createSchema = z.object({
  innovationId: z.string().optional(),
  innovationName: z.string().optional(),
  participantCode: z.string().min(1),
  participantName: z.string().optional(),
  organization: z.string().optional(),
  area: z.string().optional(),
  transferDate: z.string(),
  transferMethod: z.enum(["training", "demonstration", "coaching"]).optional(),
  evidenceUrl: z.string().optional(),
  notes: z.string().optional(),
})

export async function GET(req: NextRequest) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth
  try {
    const { searchParams } = new URL(req.url)
    const area = searchParams.get("area")
    const innovationId = searchParams.get("innovationId")

    const conditions = []
    if (area) conditions.push(eq(techTransfers.area, area))
    if (innovationId) conditions.push(eq(techTransfers.innovationId, innovationId))

    const result = await db
      .select({
        id: techTransfers.id,
        innovationId: techTransfers.innovationId,
        innovationName: techTransfers.innovationName,
        linkedInnovation: innovations.innovationName,
        participantCode: techTransfers.participantCode,
        participantName: techTransfers.participantName,
        organization: techTransfers.organization,
        area: techTransfers.area,
        transferDate: techTransfers.transferDate,
        transferMethod: techTransfers.transferMethod,
        evidenceUrl: techTransfers.evidenceUrl,
        status: techTransfers.status,
        notes: techTransfers.notes,
        createdAt: techTransfers.createdAt,
      })
      .from(techTransfers)
      .leftJoin(innovations, eq(techTransfers.innovationId, innovations.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(techTransfers.transferDate)

    return NextResponse.json({ data: result, total: result.length })
  } catch {
    return NextResponse.json({ error: "Failed to fetch tech transfers" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const body = await req.json()
    const parsed = createSchema.parse(body)

    const [item] = await db
      .insert(techTransfers)
      .values({
        id: `TRF-${nanoid()}`,
        ...parsed,
      })
      .returning()

    return NextResponse.json({ data: item }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to create tech transfer" }, { status: 500 })
  }
}
