import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { contactInquiries } from "@/lib/db/schema"
import { getAuthUser } from "@/lib/auth/guard"
import { eq, desc } from "drizzle-orm"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(1),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  subject: z.string().optional(),
  message: z.string().min(1),
  area: z.string().optional(),
})

// Public — submit contact inquiry
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = schema.parse(body)

    const [row] = await db
      .insert(contactInquiries)
      .values({ ...parsed, status: "new" })
      .returning()

    return NextResponse.json({ data: row }, { status: 201 })
  } catch (e) {
    if (e instanceof z.ZodError) return NextResponse.json({ error: e.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 })
  }
}

// Admin — list all inquiries
export async function GET(req: NextRequest) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth

  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")

    const rows = await db
      .select()
      .from(contactInquiries)
      .where(status ? eq(contactInquiries.status, status) : undefined)
      .orderBy(desc(contactInquiries.createdAt))

    return NextResponse.json({ data: rows })
  } catch {
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 })
  }
}
