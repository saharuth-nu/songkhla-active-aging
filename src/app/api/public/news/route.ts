import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { knowledgeContents } from "@/lib/db/schema"
import { eq, and, desc, sql } from "drizzle-orm"

// Public — news & activities list (content_type IN 'news', 'report', 'article')
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const isFeatured = searchParams.get("featured")

    const rows = await db
      .select({
        id: knowledgeContents.id,
        title: knowledgeContents.title,
        contentType: knowledgeContents.contentType,
        category: knowledgeContents.category,
        description: knowledgeContents.description,
        thumbnailUrl: knowledgeContents.thumbnailUrl,
        publishDate: knowledgeContents.publishDate,
        channel: knowledgeContents.channel,
        isFeatured: knowledgeContents.isFeatured,
      })
      .from(knowledgeContents)
      .where(
        and(
          eq(knowledgeContents.isPublished, true),
          sql`${knowledgeContents.contentType} IN ('news', 'report', 'article')`,
          ...(isFeatured === "true" ? [eq(knowledgeContents.isFeatured, true)] : [])
        )
      )
      .orderBy(desc(knowledgeContents.publishDate))

    return NextResponse.json({ data: rows })
  } catch {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}
