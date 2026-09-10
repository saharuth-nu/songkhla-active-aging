import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { knowledgeContents } from "@/lib/db/schema"
import { eq, ilike, and } from "drizzle-orm"
import { z } from "zod"
import { nanoid } from "@/lib/utils/nanoid"
import { getAuthUser, requireAdmin } from "@/lib/auth/guard"

const createSchema = z.object({
  title: z.string().min(1),
  contentType: z.enum(["manual", "article", "vdo", "infographic", "report", "news"]).optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  bodyText: z.string().optional(),
  fileUrl: z.string().optional(),
  externalUrl: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  channel: z.string().optional(),
  campaign: z.string().optional(),
  publishDate: z.string().optional(),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
})

export async function GET(req: NextRequest) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search")
    const contentType = searchParams.get("contentType")
    const isPublished = searchParams.get("isPublished")
    const channel = searchParams.get("channel")

    const conditions = []
    if (search) conditions.push(ilike(knowledgeContents.title, `%${search}%`))
    if (contentType) conditions.push(eq(knowledgeContents.contentType, contentType))
    if (channel) conditions.push(eq(knowledgeContents.channel, channel))
    if (isPublished !== null)
      conditions.push(eq(knowledgeContents.isPublished, isPublished === "true"))

    const result = await db
      .select()
      .from(knowledgeContents)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(knowledgeContents.publishDate)

    return NextResponse.json({ data: result, total: result.length })
  } catch {
    return NextResponse.json({ error: "Failed to fetch knowledge contents" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const body = await req.json()
    const parsed = createSchema.parse(body)

    const [item] = await db
      .insert(knowledgeContents)
      .values({
        id: `KNW-${nanoid()}`,
        ...parsed,
      })
      .returning()

    return NextResponse.json({ data: item }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to create knowledge content" }, { status: 500 })
  }
}
