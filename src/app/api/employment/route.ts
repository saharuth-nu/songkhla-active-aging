import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { employments } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
import { z } from "zod"
import { nanoid } from "@/lib/utils/nanoid"
import { getAuthUser, requireAdmin } from "@/lib/auth/guard"

const createSchema = z.object({
  personCode: z.string().min(1),
  personName: z.string().optional(),
  position: z.string().min(1),
  organization: z.string().min(1),
  employmentType: z.enum(["fulltime", "parttime", "volunteer", "contract"]).optional(),
  area: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  isActive: z.boolean().default(true),
  evidenceUrl: z.string().optional(),
})

export async function GET(req: NextRequest) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth
  try {
    const { searchParams } = new URL(req.url)
    const area = searchParams.get("area")
    const employmentType = searchParams.get("employmentType")
    const isActive = searchParams.get("isActive")

    const conditions = []
    if (area) conditions.push(eq(employments.area, area))
    if (employmentType) conditions.push(eq(employments.employmentType, employmentType))
    if (isActive !== null) conditions.push(eq(employments.isActive, isActive === "true"))

    const result = await db.select().from(employments)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(employments.startDate)

    return NextResponse.json({ data: result, total: result.length })
  } catch {
    return NextResponse.json({ error: "Failed to fetch employments" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const body = await req.json()
    const parsed = createSchema.parse(body)

    const [item] = await db.insert(employments).values({
      id: `EMP-${nanoid()}`,
      ...parsed,
    }).returning()

    return NextResponse.json({ data: item }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to create employment" }, { status: 500 })
  }
}
