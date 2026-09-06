import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { beneficiaries } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { getAuthUser, requireAdmin } from "@/lib/auth/guard"

const updateSchema = z.object({
  area: z.string().optional(),
  subdistrict: z.string().optional(),
  ageGroup: z.string().optional(),
  gender: z.string().optional(),
  beneficiaryType: z.string().optional(),
  serviceReceived: z.string().optional(),
  serviceDate: z.string().optional(),
  baselineStatus: z.string().optional(),
  midlineStatus: z.string().optional(),
  endlineStatus: z.string().optional(),
  consentGiven: z.boolean().optional(),
  consentDate: z.string().optional(),
  notes: z.string().optional(),
  status: z.string().optional(),
})

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const [item] = await db.select().from(beneficiaries).where(eq(beneficiaries.id, id))
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: item })
  } catch {
    return NextResponse.json({ error: "Failed to fetch beneficiary" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const body = await req.json()
    const parsed = updateSchema.parse(body)
    const [item] = await db.update(beneficiaries).set({ ...parsed, updatedAt: new Date() }).where(eq(beneficiaries.id, id)).returning()
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: item })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to update beneficiary" }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    await db.update(beneficiaries).set({ status: "inactive", updatedAt: new Date() }).where(eq(beneficiaries.id, id))
    return NextResponse.json({ message: "Beneficiary deactivated" })
  } catch {
    return NextResponse.json({ error: "Failed to delete beneficiary" }, { status: 500 })
  }
}
