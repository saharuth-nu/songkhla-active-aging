import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { knowledgeContents } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"

// Public — no auth required
export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const [item] = await db
      .select()
      .from(knowledgeContents)
      .where(and(eq(knowledgeContents.id, id), eq(knowledgeContents.isPublished, true)))
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: item })
  } catch {
    return NextResponse.json({ error: "Failed to fetch knowledge content" }, { status: 500 })
  }
}
