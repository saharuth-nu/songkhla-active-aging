import { NextRequest, NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth/guard"
import { createClient } from "@/utils/supabase/server"
import { z } from "zod"

const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
})

export async function POST(req: NextRequest) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth

  try {
    const body = await req.json()
    const { currentPassword, newPassword } = schema.parse(body)

    const supabase = await createClient()

    // Re-authenticate first to verify currentPassword
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: auth.email,
      password: currentPassword,
    })
    if (signInError) {
      return NextResponse.json({ error: "รหัสผ่านปัจจุบันไม่ถูกต้อง" }, { status: 400 })
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({ message: "เปลี่ยนรหัสผ่านสำเร็จ" })
  } catch (e) {
    if (e instanceof z.ZodError) return NextResponse.json({ error: e.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to change password" }, { status: 500 })
  }
}
