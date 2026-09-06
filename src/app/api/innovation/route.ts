import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { innovations } from "@/lib/db/schema"
import { eq, ilike, and } from "drizzle-orm"
import { z } from "zod"
import { nanoid } from "@/lib/utils/nanoid"
import { getAuthUser, requireAdmin } from "@/lib/auth/guard"

const createSchema = z.object({
  innovationName: z.string().min(1),
  innovationType: z.enum(["technology", "business_system", "service_model", "product"]),
  category: z.string().optional(),
  description: z.string().optional(),
  area: z.string().optional(),
  usageStatus: z.enum(["prototype", "piloting", "in_use", "transferred", "development"]).default("development"),
  valueChainRole: z.string().optional(),
  evidenceUrl: z.string().optional(),
})

export async function GET(req: NextRequest) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth
  try {
    const { searchParams } = new URL(req.url)
    const conditions = []
    const search = searchParams.get("search")
    const innovationType = searchParams.get("innovationType")
    const area = searchParams.get("area")
    if (search) conditions.push(ilike(innovations.innovationName, `%${search}%`))
    if (innovationType) conditions.push(eq(innovations.innovationType, innovationType))
    if (area) conditions.push(eq(innovations.area, area))
    const result = await db.select().from(innovations)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(innovations.createdAt)
    return NextResponse.json({ data: result })
  } catch {
    return NextResponse.json({ error: "Failed to fetch innovations" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const parsed = createSchema.parse(await req.json())
    const [item] = await db.insert(innovations).values({ id: `INN-${nanoid()}`, ...parsed }).returning()
    return NextResponse.json({ data: item }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to create innovation" }, { status: 500 })
  }
}
