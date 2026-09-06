import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { trainings } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { getAuthUser, requireAdmin } from "@/lib/auth/guard"

const updateSchema = z.object({
  title: z.string().optional(),
  trainingType: z.string().optional(),
  participantName: z.string().optional(),
  participantType: z.string().optional(),
  organization: z.string().optional(),
  area: z.string().optional(),
  trainingDate: z.string().optional(),
  location: z.string().optional(),
  durationHours: z.number().optional(),
  preScore: z.number().optional(),
  postScore: z.number().optional(),
  passStatus: z.string().optional(),
  evidenceUrl: z.string().optional(),
})

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const [item] = await db.select().from(trainings).where(eq(trainings.id, id))
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: item })
  } catch {
    return NextResponse.json({ error: "Failed to fetch training" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const body = await req.json()
    const parsed = updateSchema.parse(body)
    const [item] = await db.update(trainings).set({
      ...parsed,
      durationHours: parsed.durationHours?.toString(),
      preScore: parsed.preScore?.toString(),
      postScore: parsed.postScore?.toString(),
    }).where(eq(trainings.id, id)).returning()
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: item })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to update training" }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    await db.delete(trainings).where(eq(trainings.id, id))
    return NextResponse.json({ message: "Training deleted" })
  } catch {
    return NextResponse.json({ error: "Failed to delete training" }, { status: 500 })
  }
}
