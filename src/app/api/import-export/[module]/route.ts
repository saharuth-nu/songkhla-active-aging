import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import {
  beneficiaries, transactions, trainings, techTransfers,
  employments, partners, innovations, knowledgeContents,
} from "@/lib/db/schema"
import { requireAdmin } from "@/lib/auth/guard"
import { nanoid } from "@/lib/utils/nanoid"

type Module = keyof typeof MODULE_CONFIG

const MODULE_CONFIG = {
  beneficiaries: {
    table: beneficiaries,
    idPrefix: "BNF",
    csvHeaders: ["area", "subdistrict", "ageGroup", "gender", "beneficiaryType", "serviceReceived", "serviceDate", "consentGiven", "notes"],
    template: "area,subdistrict,ageGroup,gender,beneficiaryType,serviceReceived,serviceDate,consentGiven,notes\nพื้นที่ตัวอย่าง,ตำบล,60-64,ชาย,elderly,บริการตัวอย่าง,2025-01-01,true,หมายเหตุ",
  },
  transactions: {
    table: transactions,
    idPrefix: "TXN",
    csvHeaders: ["itemName", "requesterName", "requesterContact", "qty", "amount", "transactionDate", "area", "source", "campaign", "paymentMethod"],
    template: "itemName,requesterName,requesterContact,qty,amount,transactionDate,area,source,campaign,paymentMethod\nสินค้าตัวอย่าง,ชื่อผู้ขอ,0812345678,1,500,2025-01-01,หาดใหญ่,facebook,,โอนเงิน",
  },
  training: {
    table: trainings,
    idPrefix: "TRN",
    csvHeaders: ["title", "trainingType", "participantCode", "participantName", "participantType", "organization", "area", "trainingDate", "location", "durationHours", "preScore", "postScore", "passStatus"],
    template: "title,trainingType,participantCode,participantName,participantType,organization,area,trainingDate,location,durationHours,preScore,postScore,passStatus\nหัวข้ออบรม,workshop,P001,ชื่อผู้เข้าร่วม,entrepreneur,องค์กร,หาดใหญ่,2025-01-01,ห้องประชุม,6,70,85,pass",
  },
  "tech-transfer": {
    table: techTransfers,
    idPrefix: "TRF",
    csvHeaders: ["innovationName", "participantCode", "participantName", "organization", "area", "transferDate", "transferMethod", "notes"],
    template: "innovationName,participantCode,participantName,organization,area,transferDate,transferMethod,notes\nนวัตกรรมตัวอย่าง,P001,ชื่อผู้รับการถ่ายทอด,องค์กร,หาดใหญ่,2025-01-01,training,หมายเหตุ",
  },
  employment: {
    table: employments,
    idPrefix: "EMP",
    csvHeaders: ["personCode", "personName", "position", "organization", "employmentType", "area", "startDate", "endDate", "isActive"],
    template: "personCode,personName,position,organization,employmentType,area,startDate,endDate,isActive\nP001,ชื่อพนักงาน,ตำแหน่ง,องค์กร,fulltime,หาดใหญ่,2025-01-01,,true",
  },
  partners: {
    table: partners,
    idPrefix: "PTN",
    csvHeaders: ["organizationName", "partnerType", "networkName", "area", "agreementType", "agreementDate", "contactPerson", "contactPhone", "contactEmail"],
    template: "organizationName,partnerType,networkName,area,agreementType,agreementDate,contactPerson,contactPhone,contactEmail\nองค์กรตัวอย่าง,SE,เครือข่าย,หาดใหญ่,MOU,2025-01-01,ชื่อผู้ติดต่อ,0812345678,email@example.com",
  },
  innovations: {
    table: innovations,
    idPrefix: "INN",
    csvHeaders: ["innovationName", "innovationType", "category", "description", "area", "usageStatus"],
    template: "innovationName,innovationType,category,description,area,usageStatus\nนวัตกรรมตัวอย่าง,technology,หมวดหมู่,รายละเอียด,หาดใหญ่,piloting",
  },
  knowledge: {
    table: knowledgeContents,
    idPrefix: "KNW",
    csvHeaders: ["title", "contentType", "category", "description", "channel", "campaign", "publishDate", "isPublished"],
    template: "title,contentType,category,description,channel,campaign,publishDate,isPublished\nหัวข้อเนื้อหา,article,หมวดหมู่,รายละเอียด,facebook,แคมเปญ,2025-01-01,true",
  },
} as const

function rowsToCsv(rows: Record<string, any>[]): string {
  if (rows.length === 0) return ""
  const headers = Object.keys(rows[0])
  const lines = [headers.join(",")]
  for (const row of rows) {
    const values = headers.map((h) => {
      const v = row[h]
      if (v === null || v === undefined) return ""
      const s = String(v)
      return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s.replace(/"/g, '""')}"` : s
    })
    lines.push(values.join(","))
  }
  return lines.join("\n")
}

function parseCsv(text: string): Record<string, string>[] {
  const lines = text.trim().split("\n").filter(Boolean)
  if (lines.length < 2) return []
  const headers = lines[0].split(",").map((h) => h.trim())
  return lines.slice(1).map((line) => {
    const values = line.split(",")
    return Object.fromEntries(headers.map((h, i) => [h, (values[i] ?? "").trim()]))
  })
}

// GET — export CSV or download template
export async function GET(req: NextRequest, { params }: { params: Promise<{ module: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { module } = await params
    const config = MODULE_CONFIG[module as Module]
    if (!config) return NextResponse.json({ error: "Unknown module" }, { status: 400 })

    const { searchParams } = new URL(req.url)
    const template = searchParams.get("template") === "true"

    if (template) {
      return new NextResponse(config.template, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${module}-template.csv"`,
        },
      })
    }

    const rows = await db.select().from(config.table as any)
    const csv = rowsToCsv(rows)

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${module}-export.csv"`,
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Export failed" }, { status: 500 })
  }
}

// POST — import CSV
export async function POST(req: NextRequest, { params }: { params: Promise<{ module: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { module } = await params
    const config = MODULE_CONFIG[module as Module]
    if (!config) return NextResponse.json({ error: "Unknown module" }, { status: 400 })

    const text = await req.text()
    const rows = parseCsv(text)
    if (rows.length === 0) return NextResponse.json({ error: "No data rows found" }, { status: 400 })

    const toInsert = rows.map((row) => ({
      id: `${config.idPrefix}-${nanoid()}`,
      ...row,
    }))

    await db.insert(config.table as any).values(toInsert).onConflictDoNothing()

    return NextResponse.json({ imported: toInsert.length, message: `${toInsert.length} rows imported` })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Import failed" }, { status: 500 })
  }
}
