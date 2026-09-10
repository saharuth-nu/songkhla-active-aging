import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export type AuthUser = {
  supabaseId: string
  email: string
  role: "admin" | "viewer"
  name: string
}

/**
 * Verify session and return the authenticated user.
 * Returns NextResponse 401 if not authenticated.
 */
export async function getAuthUser(): Promise<AuthUser | NextResponse> {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const [dbUser] = await db
    .select({
      role: users.role,
      name: users.name,
    })
    .from(users)
    .where(eq(users.email, user.email!))

  if (!dbUser) {
    return NextResponse.json({ error: "User not found" }, { status: 401 })
  }

  return {
    supabaseId: user.id,
    email: user.email!,
    role: dbUser.role as "admin" | "viewer",
    name: dbUser.name,
  }
}

/**
 * Require admin role. Returns NextResponse 401/403 if not authorized.
 */
export async function requireAdmin(): Promise<AuthUser | NextResponse> {
  const result = await getAuthUser()

  if (result instanceof NextResponse) return result

  if (result.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: admin only" }, { status: 403 })
  }

  return result
}

/**
 * HOC wrapper for admin-only API route handlers.
 * Usage: export const GET = withAdmin(async (req, user) => { ... })
 */
export function withAdmin(
  handler: (req: NextRequest, user: AuthUser, context?: unknown) => Promise<NextResponse>,
) {
  return async (req: NextRequest, context?: unknown) => {
    const result = await requireAdmin()
    if (result instanceof NextResponse) return result
    return handler(req, result, context)
  }
}

/**
 * HOC wrapper for any authenticated user (admin or viewer).
 */
export function withAuth(
  handler: (req: NextRequest, user: AuthUser, context?: unknown) => Promise<NextResponse>,
) {
  return async (req: NextRequest, context?: unknown) => {
    const result = await getAuthUser()
    if (result instanceof NextResponse) return result
    return handler(req, result, context)
  }
}
