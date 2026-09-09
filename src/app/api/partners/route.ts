import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { partners } from "@/lib/db/schema"
import { eq, ilike, and } from "drizzle-orm"
import { z } from "zod"
import { nanoid } from "@/lib/utils/nanoid"
import { getAuthUser, requireAdmin } from "@/lib/auth/guard"

const createSchema = z.object({
  organizationName: z.string().min(1),
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
  isActive: z.boolean().default(true),
})

export async function GET(req: NextRequest) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth

  try {
    const { searchParams } = new URL(req.url)
    const conditions = []
    const search = searchParams.get("search")
    const partnerType = searchParams.get("partnerType")
    const area = searchParams.get("area")
    const isActive = searchParams.get("isActive")

    if (search) conditions.push(ilike(partners.organizationName, `%${search}%`))
    if (partnerType) conditions.push(eq(partners.partnerType, partnerType))
    if (area) conditions.push(eq(partners.area, area))
    if (isActive !== null) conditions.push(eq(partners.isActive, isActive === "true"))

    const result = await db
      .select()
      .from(partners)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(partners.createdAt)

    return NextResponse.json({ data: result })
  } catch {
    return NextResponse.json({ error: "Failed to fetch partners" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth

  try {
    const body = await req.json()
    const parsed = createSchema.parse(body)
    const [item] = await db
      .insert(partners)
      .values({ id: `PTN-${nanoid()}`, ...parsed })
      .returning()
    return NextResponse.json({ data: item }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to create partner" }, { status: 500 })
  }
}
