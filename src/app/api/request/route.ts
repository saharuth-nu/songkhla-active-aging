import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { transactions } from "@/lib/db/schema"
import { z } from "zod"
import { nanoid } from "@/lib/utils/nanoid"

const schema = z.object({
  itemId: z.string().optional(),
  itemName: z.string().optional(),
  beneficiaryCode: z.string().optional(),
  requesterName: z.string().min(1),
  requesterContact: z.string().min(1),
  qty: z.number().int().min(1).default(1),
  amount: z.number().optional(),
  transactionDate: z.string(),
  area: z.string().optional(),
  source: z.string().optional(),
  campaign: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmContent: z.string().optional(),
  paymentMethod: z.string().optional(),
})

// Public — no auth required (public request submission)
export async function POST(req: NextRequest) {
  try {
    const parsed = schema.parse(await req.json())
    const [item] = await db.insert(transactions).values({
      id: `TXN-${nanoid()}`,
      ...parsed,
      amount: parsed.amount?.toString(),
      status: "pending",
    }).returning({
      id: transactions.id,
      status: transactions.status,
      requesterName: transactions.requesterName,
      transactionDate: transactions.transactionDate,
      createdAt: transactions.createdAt,
    })
    return NextResponse.json({ data: item, trackingCode: item.id }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Request submission failed" }, { status: 500 })
  }
}
