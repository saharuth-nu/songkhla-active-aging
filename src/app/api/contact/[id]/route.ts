import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { contactInquiries } from "@/lib/db/schema"
import { requireAdmin } from "@/lib/auth/guard"
import { eq } from "drizzle-orm"
import { z } from "zod"

const updateSchema = z.object({
  status: z.enum(["new", "read", "replied", "closed"]).optional(),
  adminNote: z.string().optional(),
})

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth

  const { id } = await params
  const [row] = await db.select().from(contactInquiries).where(eq(contactInquiries.id, id))
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ data: row })
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth

  const { id } = await params
  try {
    const body = await req.json()
    const parsed = updateSchema.parse(body)

    const [row] = await db
      .update(contactInquiries)
      .set(parsed)
      .where(eq(contactInquiries.id, id))
      .returning()

    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: row })
  } catch (e) {
    if (e instanceof z.ZodError) return NextResponse.json({ error: e.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
