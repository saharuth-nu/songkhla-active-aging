import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function POST() {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
    return NextResponse.json({ message: "Logged out" })
  } catch {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 })
  }
}
