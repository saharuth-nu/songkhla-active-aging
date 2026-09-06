import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq, ilike, or, and } from "drizzle-orm"
import { z } from "zod"
import { requireAdmin } from "@/lib/auth/guard"
import { createAdminClient } from "@/utils/supabase/admin"

const createUserSchema = z.object({
  userType: z.string().min(1),
  role: z.enum(["admin", "viewer"]).default("viewer"),
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().optional(),
  area: z.string().optional(),
  organization: z.string().optional(),
})

export async function GET(req: NextRequest) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth

  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search")
    const role = searchParams.get("role")
    const status = searchParams.get("status")

    const conditions = []
    if (search) conditions.push(or(ilike(users.name, `%${search}%`), ilike(users.email, `%${search}%`))!)
    if (role) conditions.push(eq(users.role, role))
    if (status) conditions.push(eq(users.status, status))

    const result = await db.select({
      id: users.id,
      userType: users.userType,
      role: users.role,
      name: users.name,
      email: users.email,
      phone: users.phone,
      area: users.area,
      organization: users.organization,
      status: users.status,
      registerDate: users.registerDate,
      createdAt: users.createdAt,
    }).from(users).where(conditions.length > 0 ? and(...conditions) : undefined)

    return NextResponse.json({ data: result })
  } catch {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth

  try {
    const parsed = createUserSchema.parse(await req.json())
    const adminClient = createAdminClient()

    // 1. Create Supabase Auth account so user can login
    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email: parsed.email,
      password: parsed.password,
      email_confirm: true, // auto-confirm, no email verification required
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    // 2. Create profile row in our users table
    const [user] = await db.insert(users).values({
      userType: parsed.userType,
      role: parsed.role,
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone,
      area: parsed.area,
      organization: parsed.organization,
    }).returning({ id: users.id, name: users.name, email: users.email, role: users.role })

    return NextResponse.json({ data: user }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
