import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { requireAdmin } from "@/lib/auth/guard"
import { createAdminClient } from "@/utils/supabase/admin"

const updateUserSchema = z.object({
  userType: z.string().optional(),
  role: z.enum(["admin", "viewer"]).optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  area: z.string().optional(),
  organization: z.string().optional(),
  status: z.string().optional(),
})

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    const [user] = await db.select({
      id: users.id, userType: users.userType, role: users.role,
      name: users.name, email: users.email, phone: users.phone,
      area: users.area, organization: users.organization,
      status: users.status, registerDate: users.registerDate, createdAt: users.createdAt,
    }).from(users).where(eq(users.id, id))

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })
    return NextResponse.json({ data: user })
  } catch {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    const parsed = updateUserSchema.parse(await req.json())
    const [user] = await db.update(users)
      .set({ ...parsed, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning({ id: users.id, name: users.name, role: users.role })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })
    return NextResponse.json({ data: user })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params

    // Get email to find Supabase Auth user
    const [target] = await db.select({ email: users.email }).from(users).where(eq(users.id, id))
    if (!target) return NextResponse.json({ error: "User not found" }, { status: 404 })

    // Deactivate in our DB
    await db.update(users).set({ status: "inactive", updatedAt: new Date() }).where(eq(users.id, id))

    // Revoke all Supabase sessions for this user
    const adminClient = createAdminClient()
    const { data: authUsers } = await adminClient.auth.admin.listUsers()
    const authUser = authUsers?.users?.find((u) => u.email === target.email)
    if (authUser) {
      await adminClient.auth.admin.signOut(authUser.id, "global")
    }

    return NextResponse.json({ message: "User deactivated" })
  } catch {
    return NextResponse.json({ error: "Failed to deactivate user" }, { status: 500 })
  }
}
