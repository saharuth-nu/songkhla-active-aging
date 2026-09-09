import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { employments } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { getAuthUser, requireAdmin } from "@/lib/auth/guard"

const updateSchema = z.object({
  personName: z.string().optional(),
  position: z.string().optional(),
  organization: z.string().optional(),
  employmentType: z.string().optional(),
  area: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  isActive: z.boolean().optional(),
  status: z.string().optional(),
  evidenceUrl: z.string().optional(),
})

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const [item] = await db.select().from(employments).where(eq(employments.id, id))
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: item })
  } catch {
    return NextResponse.json({ error: "Failed to fetch employment" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const body = await req.json()
    const parsed = updateSchema.parse(body)
    const [item] = await db
      .update(employments)
      .set(parsed)
      .where(eq(employments.id, id))
      .returning()
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: item })
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to update employment" }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    await db
      .update(employments)
      .set({ isActive: false, status: "ended" })
      .where(eq(employments.id, id))
    return NextResponse.json({ message: "Employment ended" })
  } catch {
    return NextResponse.json({ error: "Failed to update employment" }, { status: 500 })
  }
}
