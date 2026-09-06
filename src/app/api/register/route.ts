import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { beneficiaries } from "@/lib/db/schema"
import { z } from "zod"
import { nanoid } from "@/lib/utils/nanoid"

const schema = z.object({
  area: z.string().min(1),
  subdistrict: z.string().optional(),
  ageGroup: z.enum(["60-64", "65-69", "70-74", "75+"]).optional(),
  gender: z.string().optional(),
  beneficiaryType: z.enum(["elderly", "caregiver", "community_member"]).optional(),
  serviceReceived: z.string().optional(),
  serviceDate: z.string().optional(),
  consentGiven: z.boolean().default(false),
  consentDate: z.string().optional(),
  notes: z.string().optional(),
})

// Public — no auth required (beneficiary self-registration)
export async function POST(req: NextRequest) {
  try {
    const parsed = schema.parse(await req.json())
    const id = `BNF-${nanoid()}`
    const [item] = await db.insert(beneficiaries).values({ id, ...parsed }).returning({
      id: beneficiaries.id,
      area: beneficiaries.area,
      beneficiaryType: beneficiaries.beneficiaryType,
      createdAt: beneficiaries.createdAt,
    })
    return NextResponse.json({ data: item, code: id }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
