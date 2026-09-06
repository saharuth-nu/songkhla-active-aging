import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { transactions, valueChains } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { getAuthUser, requireAdmin } from "@/lib/auth/guard"

const updateSchema = z.object({
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]).optional(),
  adminNote: z.string().optional(),
  paymentMethod: z.string().optional(),
  paymentEvidenceUrl: z.string().optional(),
  // value chain fields (applied when status -> completed)
  producerIncome: z.number().optional(),
  serviceProviderIncome: z.number().optional(),
  communityIncome: z.number().optional(),
  otherIncome: z.number().optional(),
  distributionNote: z.string().optional(),
})

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const [item] = await db.select().from(transactions).where(eq(transactions.id, id))
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })

    const valueChain = await db.select().from(valueChains).where(eq(valueChains.transactionId, id))
    return NextResponse.json({ data: { ...item, valueChain: valueChain[0] ?? null } })
  } catch {
    return NextResponse.json({ error: "Failed to fetch transaction" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const body = await req.json()
    const { producerIncome, serviceProviderIncome, communityIncome, otherIncome, distributionNote, ...txData } = updateSchema.parse(body)

    const [item] = await db.update(transactions)
      .set({ ...txData, updatedAt: new Date() })
      .where(eq(transactions.id, id))
      .returning()
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })

    // Auto-create/update value chain when completed
    if (txData.status === "completed" && (producerIncome !== undefined || communityIncome !== undefined)) {
      const existing = await db.select().from(valueChains).where(eq(valueChains.transactionId, id))
      if (existing.length > 0) {
        await db.update(valueChains).set({
          producerIncome: producerIncome?.toString(),
          serviceProviderIncome: serviceProviderIncome?.toString(),
          communityIncome: communityIncome?.toString(),
          otherIncome: otherIncome?.toString(),
          distributionNote,
        }).where(eq(valueChains.transactionId, id))
      } else {
        await db.insert(valueChains).values({
          transactionId: id,
          producerIncome: producerIncome?.toString(),
          serviceProviderIncome: serviceProviderIncome?.toString(),
          communityIncome: communityIncome?.toString(),
          otherIncome: otherIncome?.toString(),
          distributionNote,
        })
      }
    }

    return NextResponse.json({ data: item })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 })
  }
}
