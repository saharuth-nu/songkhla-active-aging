import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { transactions, productServices } from "@/lib/db/schema"
import { eq, and, gte, lte } from "drizzle-orm"
import { z } from "zod"
import { nanoid } from "@/lib/utils/nanoid"
import { getAuthUser, requireAdmin } from "@/lib/auth/guard"

const createSchema = z.object({
  itemId: z.string().optional(),
  itemName: z.string().optional(),
  beneficiaryCode: z.string().optional(),
  requesterName: z.string().min(1),
  requesterContact: z.string().min(1),
  qty: z.number().default(1),
  amount: z.number().optional(),
  transactionDate: z.string(),
  area: z.string().optional(),
  source: z.string().optional(),
  campaign: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmContent: z.string().optional(),
  paymentMethod: z.string().optional(),
  paymentEvidenceUrl: z.string().optional(),
})

export async function GET(req: NextRequest) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const area = searchParams.get("area")
    const dateFrom = searchParams.get("dateFrom")
    const dateTo = searchParams.get("dateTo")
    const itemId = searchParams.get("itemId")

    const conditions = []
    if (status) conditions.push(eq(transactions.status, status))
    if (area) conditions.push(eq(transactions.area, area))
    if (dateFrom) conditions.push(gte(transactions.transactionDate, dateFrom))
    if (dateTo) conditions.push(lte(transactions.transactionDate, dateTo))
    if (itemId) conditions.push(eq(transactions.itemId, itemId))

    const result = await db
      .select({
        id: transactions.id,
        itemId: transactions.itemId,
        itemName: transactions.itemName,
        productName: productServices.itemName,
        beneficiaryCode: transactions.beneficiaryCode,
        requesterName: transactions.requesterName,
        requesterContact: transactions.requesterContact,
        qty: transactions.qty,
        amount: transactions.amount,
        transactionDate: transactions.transactionDate,
        area: transactions.area,
        source: transactions.source,
        campaign: transactions.campaign,
        paymentMethod: transactions.paymentMethod,
        status: transactions.status,
        adminNote: transactions.adminNote,
        createdAt: transactions.createdAt,
      })
      .from(transactions)
      .leftJoin(productServices, eq(transactions.itemId, productServices.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(transactions.createdAt)

    return NextResponse.json({ data: result, total: result.length })
  } catch {
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const body = await req.json()
    const parsed = createSchema.parse(body)

    const [item] = await db
      .insert(transactions)
      .values({
        id: `TXN-${nanoid()}`,
        ...parsed,
        amount: parsed.amount?.toString(),
      })
      .returning()

    return NextResponse.json({ data: item }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ error: error.errors }, { status: 400 })
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 })
  }
}
