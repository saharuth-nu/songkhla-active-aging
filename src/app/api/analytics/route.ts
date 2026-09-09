import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { analyticsEvents } from "@/lib/db/schema"
import { z } from "zod"
import { createHash } from "crypto"

const schema = z.object({
  sessionId: z.string().optional(),
  pageUrl: z.string().optional(),
  referrerUrl: z.string().optional(),
  eventType: z.enum(["pageview", "click", "form_submit", "order"]).default("pageview"),
  eventTarget: z.string().optional(),
  area: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  utmTerm: z.string().optional(),
})

// Public — no auth required (client-side tracking)
export async function POST(req: NextRequest) {
  try {
    const parsed = schema.parse(await req.json())
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ?? req.headers.get("x-real-ip") ?? ""
    const ipHash = ip ? createHash("sha256").update(ip).digest("hex").slice(0, 16) : undefined

    await db.insert(analyticsEvents).values({ ...parsed, ipHash })

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 })
  }
}
