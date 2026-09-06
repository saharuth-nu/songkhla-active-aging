import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { beneficiaries, transactions, trainings, employments, partners } from "@/lib/db/schema"
import { eq, and, count, countDistinct, sum } from "drizzle-orm"
import { getAuthUser } from "@/lib/auth/guard"

export async function GET(req: NextRequest) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth
  try {
    const { searchParams } = new URL(req.url)
    const area = searchParams.get("area") ?? undefined

    const [
      beneficiaryByArea,
      transactionByArea,
      trainingByArea,
      employmentByArea,
      partnerByArea,
    ] = await Promise.all([
      db.select({ area: beneficiaries.area, count: count() })
        .from(beneficiaries)
        .where(area ? eq(beneficiaries.area, area) : undefined)
        .groupBy(beneficiaries.area),

      db.select({ area: transactions.area, count: count(), total: sum(transactions.amount) })
        .from(transactions)
        .where(area ? eq(transactions.area, area) : undefined)
        .groupBy(transactions.area),

      db.select({ area: trainings.area, count: count() })
        .from(trainings)
        .where(area ? eq(trainings.area, area) : undefined)
        .groupBy(trainings.area),

      db.select({ area: employments.area, count: countDistinct(employments.personCode) })
        .from(employments)
        .where(area
          ? and(eq(employments.area, area), eq(employments.isActive, true))
          : eq(employments.isActive, true))
        .groupBy(employments.area),

      db.select({ area: partners.area, count: count() })
        .from(partners)
        .where(area
          ? and(eq(partners.area, area), eq(partners.isActive, true))
          : eq(partners.isActive, true))
        .groupBy(partners.area),
    ])

    return NextResponse.json({
      data: { beneficiaryByArea, transactionByArea, trainingByArea, employmentByArea, partnerByArea },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch area dashboard" }, { status: 500 })
  }
}
