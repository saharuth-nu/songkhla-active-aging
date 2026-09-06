import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { knowledgeContents } from "@/lib/db/schema"
import { eq, ilike, and } from "drizzle-orm"

// Public — no auth required
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search")
    const contentType = searchParams.get("contentType")
    const channel = searchParams.get("channel")

    const conditions = [eq(knowledgeContents.isPublished, true)]
    if (search) conditions.push(ilike(knowledgeContents.title, `%${search}%`))
    if (contentType) conditions.push(eq(knowledgeContents.contentType, contentType))
    if (channel) conditions.push(eq(knowledgeContents.channel, channel))

    const result = await db.select({
      id: knowledgeContents.id,
      title: knowledgeContents.title,
      contentType: knowledgeContents.contentType,
      category: knowledgeContents.category,
      description: knowledgeContents.description,
      thumbnailUrl: knowledgeContents.thumbnailUrl,
      externalUrl: knowledgeContents.externalUrl,
      channel: knowledgeContents.channel,
      publishDate: knowledgeContents.publishDate,
      isFeatured: knowledgeContents.isFeatured,
    }).from(knowledgeContents)
      .where(and(...conditions))
      .orderBy(knowledgeContents.publishDate)

    return NextResponse.json({ data: result })
  } catch {
    return NextResponse.json({ error: "Failed to fetch knowledge" }, { status: 500 })
  }
}
