import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth/guard"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function GET() {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth

  try {
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        userType: users.userType,
        area: users.area,
        organization: users.organization,
        phone: users.phone,
        status: users.status,
      })
      .from(users)
      .where(eq(users.email, auth.email))

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    return NextResponse.json({ data: user })
  } catch {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}
