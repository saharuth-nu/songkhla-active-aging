import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { knowledgeContents } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { getAuthUser, requireAdmin } from "@/lib/auth/guard"

const updateSchema = z.object({
  title: z.string().optional(),
  contentType: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  bodyText: z.string().optional(),
  fileUrl: z.string().optional(),
  externalUrl: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  channel: z.string().optional(),
  campaign: z.string().optional(),
  publishDate: z.string().optional(),
  reach: z.number().optional(),
  engagement: z.number().optional(),
  clickCount: z.number().optional(),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
})

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const [item] = await db.select().from(knowledgeContents).where(eq(knowledgeContents.id, id))
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: item })
  } catch {
    return NextResponse.json({ error: "Failed to fetch knowledge content" }, { status: 500 })
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
      .update(knowledgeContents)
      .set({ ...parsed, updatedAt: new Date() })
      .where(eq(knowledgeContents.id, id))
      .returning()
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: item })
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to update knowledge content" }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    await db
      .update(knowledgeContents)
      .set({ isPublished: false, updatedAt: new Date() })
      .where(eq(knowledgeContents.id, id))
    return NextResponse.json({ message: "Content unpublished" })
  } catch {
    return NextResponse.json({ error: "Failed to delete knowledge content" }, { status: 500 })
  }
}
