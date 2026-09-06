import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { techTransfers } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { getAuthUser, requireAdmin } from "@/lib/auth/guard"

const updateSchema = z.object({
  innovationId: z.string().optional(),
  innovationName: z.string().optional(),
  participantCode: z.string().optional(),
  participantName: z.string().optional(),
  organization: z.string().optional(),
  area: z.string().optional(),
  transferDate: z.string().optional(),
  transferMethod: z.string().optional(),
  evidenceUrl: z.string().optional(),
  status: z.string().optional(),
  notes: z.string().optional(),
})

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const [item] = await db.select().from(techTransfers).where(eq(techTransfers.id, id))
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: item })
  } catch {
    return NextResponse.json({ error: "Failed to fetch tech transfer" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const body = await req.json()
    const parsed = updateSchema.parse(body)
    const [item] = await db.update(techTransfers).set(parsed).where(eq(techTransfers.id, id)).returning()
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: item })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to update tech transfer" }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    await db.delete(techTransfers).where(eq(techTransfers.id, id))
    return NextResponse.json({ message: "Tech transfer deleted" })
  } catch {
    return NextResponse.json({ error: "Failed to delete tech transfer" }, { status: 500 })
  }
}
