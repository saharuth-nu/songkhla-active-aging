import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { beneficiaries } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
import { z } from "zod"
import { nanoid } from "@/lib/utils/nanoid"
import { getAuthUser, requireAdmin } from "@/lib/auth/guard"

const createSchema = z.object({
  area: z.string().min(1),
  subdistrict: z.string().optional(),
  ageGroup: z.enum(["60-64", "65-69", "70-74", "75+"]).optional(),
  gender: z.string().optional(),
  beneficiaryType: z.enum(["elderly", "caregiver", "community_member"]).optional(),
  serviceReceived: z.string().optional(),
  serviceDate: z.string().optional(),
  baselineStatus: z.string().optional(),
  midlineStatus: z.string().optional(),
  endlineStatus: z.string().optional(),
  consentGiven: z.boolean().default(false),
  consentDate: z.string().optional(),
  notes: z.string().optional(),
})

export async function GET(req: NextRequest) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth
  try {
    const { searchParams } = new URL(req.url)
    const conditions = []
    const area = searchParams.get("area")
    const beneficiaryType = searchParams.get("beneficiaryType")
    const ageGroup = searchParams.get("ageGroup")
    const status = searchParams.get("status")
    if (area) conditions.push(eq(beneficiaries.area, area))
    if (beneficiaryType) conditions.push(eq(beneficiaries.beneficiaryType, beneficiaryType))
    if (ageGroup) conditions.push(eq(beneficiaries.ageGroup, ageGroup))
    if (status) conditions.push(eq(beneficiaries.status, status))
    const result = await db
      .select()
      .from(beneficiaries)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(beneficiaries.createdAt)
    return NextResponse.json({ data: result, total: result.length })
  } catch {
    return NextResponse.json({ error: "Failed to fetch beneficiaries" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const parsed = createSchema.parse(await req.json())
    const [item] = await db
      .insert(beneficiaries)
      .values({ id: `BNF-${nanoid()}`, ...parsed })
      .returning()
    return NextResponse.json({ data: item }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to create beneficiary" }, { status: 500 })
  }
}
