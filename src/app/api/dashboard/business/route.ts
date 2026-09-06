import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { transactions, valueChains, productServices } from "@/lib/db/schema"
import { eq, and, gte, lte, sum, count, sql, SQL } from "drizzle-orm"
import { getAuthUser } from "@/lib/auth/guard"

export async function GET(req: NextRequest) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth
  try {
    const { searchParams } = new URL(req.url)
    const dateFrom = searchParams.get("dateFrom")
    const dateTo = searchParams.get("dateTo")
    const area = searchParams.get("area")

    const conditions: SQL[] = []
    if (dateFrom) conditions.push(gte(transactions.transactionDate, dateFrom))
    if (dateTo) conditions.push(lte(transactions.transactionDate, dateTo))
    if (area) conditions.push(eq(transactions.area, area))

    const [
      revenue,
      byStatus,
      byProduct,
      valueChainSummary,
      byPaymentMethod,
    ] = await Promise.all([
      db.select({
        totalRevenue: sum(transactions.amount),
        totalCount: count(),
      }).from(transactions)
        .where(and(eq(transactions.status, "completed"), ...conditions)),

      db.select({ status: transactions.status, count: count(), total: sum(transactions.amount) })
        .from(transactions)
        .where(conditions.length ? and(...conditions) : undefined)
        .groupBy(transactions.status),

      db.select({
        itemId: transactions.itemId,
        itemName: transactions.itemName,
        productName: productServices.itemName,
        count: count(),
        total: sum(transactions.amount),
      }).from(transactions)
        .leftJoin(productServices, eq(transactions.itemId, productServices.id))
        .where(conditions.length ? and(...conditions) : undefined)
        .groupBy(transactions.itemId, transactions.itemName, productServices.itemName)
        .orderBy(sql`count(*) DESC`)
        .limit(10),

      db.select({
        totalAmount: sum(transactions.amount),
        communityTotal: sql<number>`COALESCE(SUM(${valueChains.communityIncome}::numeric), 0)`,
        producerTotal: sql<number>`COALESCE(SUM(${valueChains.producerIncome}::numeric), 0)`,
        serviceTotal: sql<number>`COALESCE(SUM(${valueChains.serviceProviderIncome}::numeric), 0)`,
        otherTotal: sql<number>`COALESCE(SUM(${valueChains.otherIncome}::numeric), 0)`,
      }).from(valueChains)
        .leftJoin(transactions, eq(valueChains.transactionId, transactions.id))
        .where(eq(transactions.status, "completed")),

      db.select({ method: transactions.paymentMethod, count: count() })
        .from(transactions)
        .where(conditions.length ? and(...conditions) : undefined)
        .groupBy(transactions.paymentMethod),
    ])

    const vc = valueChainSummary[0]
    const totalAmt = Number(vc.totalAmount ?? 0)
    const vcPercent = totalAmt > 0 ? Number(((Number(vc.communityTotal) / totalAmt) * 100).toFixed(2)) : 0

    return NextResponse.json({
      data: {
        revenue,
        byStatus,
        byProduct,
        valueChain: {
          ...vc,
          vcPercent,
        },
        byPaymentMethod,
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch business dashboard" }, { status: 500 })
  }
}
