import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getAuthUser } from "@/lib/auth/guard"
import {
  beneficiaries, transactions, productServices,
  partners, trainings, employments, innovations,
} from "@/lib/db/schema"
import { eq, sql, count, countDistinct, sum } from "drizzle-orm"

export async function GET() {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth
  try {
    const [
      totalBeneficiaries,
      totalTransactions,
      totalRevenue,
      activeProducts,
      activePartners,
      activeEmployments,
      totalTrainings,
      totalInnovations,
      recentTransactions,
      transactionsByStatus,
    ] = await Promise.all([
      db.select({ count: count() }).from(beneficiaries).where(eq(beneficiaries.status, "active")),
      db.select({ count: count() }).from(transactions),
      db.select({ total: sum(transactions.amount) }).from(transactions).where(eq(transactions.status, "completed")),
      db.select({ count: count() }).from(productServices).where(eq(productServices.isActive, true)),
      db.select({ count: count() }).from(partners).where(eq(partners.isActive, true)),
      db.select({ count: countDistinct(employments.personCode) }).from(employments).where(eq(employments.isActive, true)),
      db.select({ count: count() }).from(trainings),
      db.select({ count: count() }).from(innovations),
      db.select({
        id: transactions.id,
        itemName: transactions.itemName,
        requesterName: transactions.requesterName,
        amount: transactions.amount,
        status: transactions.status,
        transactionDate: transactions.transactionDate,
        area: transactions.area,
        source: transactions.source,
      }).from(transactions).orderBy(sql`${transactions.createdAt} DESC`).limit(10),
      db.select({
        status: transactions.status,
        count: count(),
      }).from(transactions).groupBy(transactions.status),
    ])

    return NextResponse.json({
      data: {
        summary: {
          totalBeneficiaries: totalBeneficiaries[0]?.count ?? 0,
          totalTransactions: totalTransactions[0]?.count ?? 0,
          totalRevenue: Number(totalRevenue[0]?.total ?? 0),
          activeProducts: activeProducts[0]?.count ?? 0,
          activePartners: activePartners[0]?.count ?? 0,
          activeEmployments: activeEmployments[0]?.count ?? 0,
          totalTrainings: totalTrainings[0]?.count ?? 0,
          totalInnovations: totalInnovations[0]?.count ?? 0,
        },
        recentTransactions,
        transactionsByStatus,
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch dashboard" }, { status: 500 })
  }
}
