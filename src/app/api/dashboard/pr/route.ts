import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { analyticsEvents, transactions, knowledgeContents } from "@/lib/db/schema"
import { eq, and, gte, lte, count, sum, sql, SQL } from "drizzle-orm"
import { getAuthUser } from "@/lib/auth/guard"

export async function GET(req: NextRequest) {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth
  try {
    const { searchParams } = new URL(req.url)
    const dateFrom = searchParams.get("dateFrom")
    const dateTo = searchParams.get("dateTo")

    const evtConditions: SQL[] = []
    if (dateFrom) evtConditions.push(gte(analyticsEvents.createdAt, new Date(dateFrom)))
    if (dateTo) evtConditions.push(lte(analyticsEvents.createdAt, new Date(dateTo + "T23:59:59")))

    const txnConditions: SQL[] = []
    if (dateFrom) txnConditions.push(gte(transactions.transactionDate, dateFrom))
    if (dateTo) txnConditions.push(lte(transactions.transactionDate, dateTo))

    const [pageviews, bySource, byCampaign, byEventType, conversionBySource, featuredContent] =
      await Promise.all([
        db
          .select({ count: count() })
          .from(analyticsEvents)
          .where(and(eq(analyticsEvents.eventType, "pageview"), ...evtConditions)),

        db
          .select({ source: analyticsEvents.utmSource, count: count() })
          .from(analyticsEvents)
          .where(evtConditions.length ? and(...evtConditions) : undefined)
          .groupBy(analyticsEvents.utmSource)
          .orderBy(sql`count(*) DESC`),

        db
          .select({ campaign: analyticsEvents.utmCampaign, count: count() })
          .from(analyticsEvents)
          .where(evtConditions.length ? and(...evtConditions) : undefined)
          .groupBy(analyticsEvents.utmCampaign)
          .orderBy(sql`count(*) DESC`),

        db
          .select({ eventType: analyticsEvents.eventType, count: count() })
          .from(analyticsEvents)
          .where(evtConditions.length ? and(...evtConditions) : undefined)
          .groupBy(analyticsEvents.eventType),

        db
          .select({ source: transactions.source, campaign: transactions.campaign, count: count() })
          .from(transactions)
          .where(txnConditions.length ? and(...txnConditions) : undefined)
          .groupBy(transactions.source, transactions.campaign)
          .orderBy(sql`count(*) DESC`)
          .limit(10),

        db
          .select({
            id: knowledgeContents.id,
            title: knowledgeContents.title,
            contentType: knowledgeContents.contentType,
            reach: knowledgeContents.reach,
            engagement: knowledgeContents.engagement,
            clickCount: knowledgeContents.clickCount,
            channel: knowledgeContents.channel,
          })
          .from(knowledgeContents)
          .where(eq(knowledgeContents.isPublished, true))
          .orderBy(sql`${knowledgeContents.reach} DESC NULLS LAST`)
          .limit(10),
      ])

    return NextResponse.json({
      data: {
        pageviews: pageviews[0]?.count ?? 0,
        bySource,
        byCampaign,
        byEventType,
        conversionBySource,
        featuredContent,
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch PR dashboard" }, { status: 500 })
  }
}
