import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { transactions } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

// Public — no auth required (status tracking by code)
export async function GET(_: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  try {
    const { code } = await params
    const [item] = await db.select({
      id: transactions.id,
      itemName: transactions.itemName,
      requesterName: transactions.requesterName,
      qty: transactions.qty,
      amount: transactions.amount,
      transactionDate: transactions.transactionDate,
      area: transactions.area,
      status: transactions.status,
      adminNote: transactions.adminNote,
      createdAt: transactions.createdAt,
    }).from(transactions).where(eq(transactions.id, code))
    if (!item) return NextResponse.json({ error: "Request not found" }, { status: 404 })
    return NextResponse.json({ data: item })
  } catch {
    return NextResponse.json({ error: "Failed to fetch request status" }, { status: 500 })
  }
}
