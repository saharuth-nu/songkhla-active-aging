import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { partners } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { getAuthUser, requireAdmin } from "@/lib/auth/guard"

const updateSchema = z.object({
  organizationName: z.string().optional(),
  partnerType: z.string().optional(),
  networkName: z.string().optional(),
  area: z.string().optional(),
  agreementType: z.string().optional(),
  agreementDate: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  contactPerson: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional(),
  evidenceUrl: z.string().optional(),
  isActive: z.boolean().optional(),
})

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const [item] = await db.select().from(partners).where(eq(partners.id, id))
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: item })
  } catch {
    return NextResponse.json({ error: "Failed to fetch partner" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const parsed = updateSchema.parse(await req.json())
    const [item] = await db.update(partners).set({ ...parsed, updatedAt: new Date() }).where(eq(partners.id, id)).returning()
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
    await db.update(partners).set({ isActive: false, updatedAt: new Date() }).where(eq(partners.id, id))
    return NextResponse.json({ message: "Partner deactivated" })
  } catch {
    return NextResponse.json({ error: "Failed to deactivate partner" }, { status: 500 })
  }
}
