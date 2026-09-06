import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { landingPages, productServices } from "@/lib/db/schema"
import { eq, and, inArray } from "drizzle-orm"

// Public — serve campaign landing page by slug
export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params

    const [page] = await db
      .select()
      .from(landingPages)
      .where(and(eq(landingPages.slug, slug), eq(landingPages.isActive, true)))

    if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 })

    // Check expiry
    if (page.expiryDate && new Date(page.expiryDate) < new Date()) {
      return NextResponse.json({ error: "Landing page หมดอายุแล้ว" }, { status: 410 })
    }

    // Fetch linked products if any
    let linkedItems: typeof productServices.$inferSelect[] = []
    if (page.linkedItemIds) {
      const ids = page.linkedItemIds.split(",").map((s) => s.trim()).filter(Boolean)
      if (ids.length > 0) {
        linkedItems = await db
          .select()
          .from(productServices)
          .where(and(inArray(productServices.id, ids), eq(productServices.isActive, true)))
      }
    }

    return NextResponse.json({
      data: {
        ...page,
        linkedItems,
      },
    })
  } catch {
    return NextResponse.json({ error: "Failed to fetch landing page" }, { status: 500 })
  }
}
