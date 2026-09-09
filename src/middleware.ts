import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/middleware"

export async function middleware(request: NextRequest) {
  const { supabase, supabaseResponse } = createClient(request)

  // Refresh session — do not remove this line
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect admin routes
  if (
    request.nextUrl.pathname.startsWith("/(admin)") ||
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/beneficiaries") ||
    (request.nextUrl.pathname.startsWith("/products") &&
      request.nextUrl.pathname.includes("/admin"))
  ) {
    if (!user) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("next", request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
