import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { innovations } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { getAuthUser, requireAdmin } from "@/lib/auth/guard"

const updateSchema = z.object({
  innovationName: z.string().optional(),
  innovationType: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  area: z.string().optional(),
  usageStatus: z.string().optional(),
  valueChainRole: z.string().optional(),
  evidenceUrl: z.string().optional(),
})

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const [item] = await db.select().from(innovations).where(eq(innovations.id, id))
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: item })
  } catch {
    return NextResponse.json({ error: "Failed to fetch innovation" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const parsed = updateSchema.parse(await req.json())
    const [item] = await db.update(innovations).set({ ...parsed, updatedAt: new Date() }).where(eq(innovations.id, id)).returning()
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: item })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    await db.delete(innovations).where(eq(innovations.id, id))
    return NextResponse.json({ message: "Innovation deleted" })
  } catch {
    return NextResponse.json({ error: "Failed to delete innovation" }, { status: 500 })
  }
}
