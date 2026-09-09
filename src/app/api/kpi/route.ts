import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getAuthUser } from "@/lib/auth/guard"
import {
  kpiTargets,
  kpiManualInputs,
  beneficiaries,
  trainings,
  techTransfers,
  productServices,
  transactions,
  valueChains,
  employments,
  partners,
  innovations,
  knowledgeContents,
} from "@/lib/db/schema"
import { eq, sql, and, count, countDistinct, gte, lte, SQL } from "drizzle-orm"

export async function GET(req: NextRequest) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(req.url)
  const area = searchParams.get("area")
  const dateFrom = searchParams.get("dateFrom") // YYYY-MM-DD
  const dateTo = searchParams.get("dateTo") // YYYY-MM-DD

  try {
    const targets = await db
      .select()
      .from(kpiTargets)
      .where(eq(kpiTargets.isActive, true))
      .orderBy(kpiTargets.sortOrder)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const areaEq = (col: any) => (area ? eq(col, area) : undefined)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dateGte = (col: any) => (dateFrom ? gte(col, dateFrom) : undefined)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dateLte = (col: any) => (dateTo ? lte(col, dateTo) : undefined)

    const filterConds = (conds: (SQL | undefined)[]) =>
      conds.filter((c): c is SQL => c !== undefined)

    const [kpi01, kpi02, kpi03, kpi04, kpi05, kpi06, kpi07, kpi08, kpi09, kpi10, kpi11] =
      await Promise.all([
        // KPI01 — SE partners (area + date filter on created_at)
        db
          .select({ count: count() })
          .from(partners)
          .where(
            and(
              eq(partners.partnerType, "SE"),
              eq(partners.isActive, true),
              ...filterConds([areaEq(partners.area)]),
            ),
          ),

        // KPI02 — trained entrepreneurs/health_personnel (area + date on training_date)
        db
          .select({ count: countDistinct(trainings.participantCode) })
          .from(trainings)
          .where(
            and(
              sql`${trainings.participantType} IN ('entrepreneur','health_personnel')`,
              ...filterConds([
                areaEq(trainings.area),
                dateGte(trainings.trainingDate),
                dateLte(trainings.trainingDate),
              ]),
            ),
          ),

        // KPI03 — tech transfer (area + date on transfer_date)
        db
          .select({ count: countDistinct(techTransfers.participantCode) })
          .from(techTransfers)
          .where(
            and(
              ...filterConds([
                areaEq(techTransfers.area),
                dateGte(techTransfers.transferDate),
                dateLte(techTransfers.transferDate),
              ]),
            ),
          ),

        // KPI04 — active products (area filter)
        db
          .select({ count: count() })
          .from(productServices)
          .where(
            and(eq(productServices.isActive, true), ...filterConds([areaEq(productServices.area)])),
          ),

        // KPI05 — value chain % (area + date on transaction_date) — completed only
        db
          .select({
            communityTotal: sql<number>`COALESCE(SUM(${valueChains.communityIncome}::numeric), 0)`,
            grandTotal: sql<number>`COALESCE(SUM(${transactions.amount}::numeric), 0)`,
          })
          .from(valueChains)
          .leftJoin(transactions, eq(valueChains.transactionId, transactions.id))
          .where(
            and(
              eq(transactions.status, "completed"),
              ...filterConds([
                areaEq(transactions.area),
                dateGte(transactions.transactionDate),
                dateLte(transactions.transactionDate),
              ]),
            ),
          ),

        // KPI06 — employment (area filter)
        db
          .select({ count: countDistinct(employments.personCode) })
          .from(employments)
          .where(and(eq(employments.isActive, true), ...filterConds([areaEq(employments.area)]))),

        // KPI07 — beneficiaries with service (area filter)
        db
          .select({ count: countDistinct(beneficiaries.id) })
          .from(beneficiaries)
          .where(
            and(
              sql`${beneficiaries.serviceReceived} IS NOT NULL`,
              ...filterConds([areaEq(beneficiaries.area)]),
            ),
          ),

        // KPI08 — distinct networks (area filter)
        db
          .select({ count: countDistinct(partners.networkName) })
          .from(partners)
          .where(and(eq(partners.isActive, true), ...filterConds([areaEq(partners.area)]))),

        // KPI09 — technology innovations (area filter)
        db
          .select({ count: count() })
          .from(innovations)
          .where(
            and(
              eq(innovations.innovationType, "technology"),
              ...filterConds([areaEq(innovations.area)]),
            ),
          ),

        // KPI10 — business_system innovations (area filter)
        db
          .select({ count: count() })
          .from(innovations)
          .where(
            and(
              eq(innovations.innovationType, "business_system"),
              ...filterConds([areaEq(innovations.area)]),
            ),
          ),

        // KPI11 — published manuals (no area — knowledge is global)
        db
          .select({ count: count() })
          .from(knowledgeContents)
          .where(
            and(
              eq(knowledgeContents.contentType, "manual"),
              eq(knowledgeContents.isPublished, true),
            ),
          ),
      ])

    const vcRow = kpi05[0]
    const vcPercent =
      vcRow.grandTotal > 0
        ? Number(((vcRow.communityTotal / vcRow.grandTotal) * 100).toFixed(2))
        : 0

    const actuals: Record<string, number> = {
      KPI01: kpi01[0]?.count ?? 0,
      KPI02: kpi02[0]?.count ?? 0,
      KPI03: kpi03[0]?.count ?? 0,
      KPI04: kpi04[0]?.count ?? 0,
      KPI05: vcPercent,
      KPI06: kpi06[0]?.count ?? 0,
      KPI07: kpi07[0]?.count ?? 0,
      KPI08: kpi08[0]?.count ?? 0,
      KPI09: kpi09[0]?.count ?? 0,
      KPI10: kpi10[0]?.count ?? 0,
      KPI11: kpi11[0]?.count ?? 0,
      KPI12: 0,
    }

    // KPI12 — manual input (latest, not filtered by area/date)
    const kpi12Manual = await db
      .select()
      .from(kpiManualInputs)
      .where(eq(kpiManualInputs.kpiCode, "KPI12"))
      .orderBy(sql`${kpiManualInputs.inputDate} DESC`)
      .limit(1)
    if (kpi12Manual.length > 0) actuals.KPI12 = Number(kpi12Manual[0].actualValue ?? 0)

    const data = targets.map((t) => {
      const actual = actuals[t.kpiCode] ?? 0
      const target = Number(t.targetValue)
      return {
        ...t,
        actual,
        progress: target > 0 ? Math.min(Math.round((actual / target) * 100), 100) : 0,
        status: actual >= target ? "achieved" : actual >= target * 0.7 ? "on_track" : "behind",
      }
    })

    return NextResponse.json({
      data,
      filters: { area: area ?? null, dateFrom: dateFrom ?? null, dateTo: dateTo ?? null },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to compute KPIs" }, { status: 500 })
  }
}
