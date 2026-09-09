import Link from "next/link"
import { KPI_DEFINITIONS, KPI_STATUS_LABELS } from "@/constants/kpi"

// Mock data — will be replaced by real DB queries
const MOCK_KPI_ACTUALS: Record<number, number> = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 1,
}

function getStatus(actual: number, target: number) {
  const pct = target > 0 ? Math.min((actual / target) * 100, 100) : 0
  if (pct >= 100) return "achieved"
  if (pct >= 60) return "on-track"
  if (pct > 0) return "at-risk"
  return "not-started"
}

const STATUS_STYLES = {
  achieved: "bg-green-100 text-green-700",
  "on-track": "bg-blue-100 text-blue-700",
  "at-risk": "bg-amber-100 text-amber-700",
  "not-started": "bg-gray-100 text-gray-500",
}

export default function AdminDashboardPage() {
  const kpiData = KPI_DEFINITIONS.map((kpi) => ({
    ...kpi,
    actual: MOCK_KPI_ACTUALS[kpi.kpi_no] ?? 0,
    status: getStatus(MOCK_KPI_ACTUALS[kpi.kpi_no] ?? 0, kpi.target),
    pct:
      kpi.target > 0
        ? Math.min(Math.round(((MOCK_KPI_ACTUALS[kpi.kpi_no] ?? 0) / kpi.target) * 100), 100)
        : 0,
  }))

  const achieved = kpiData.filter((k) => k.status === "achieved").length
  const onTrack = kpiData.filter((k) => k.status === "on-track").length

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ภาพรวมโครงการ</h1>
        <p className="mt-1 text-sm text-gray-500">Songkhla Active Aging — KPI Dashboard</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            label: "KPI ทั้งหมด",
            value: "12",
            sub: "ตัวชี้วัด",
            color: "bg-teal-50 text-teal-700",
          },
          {
            label: "บรรลุเป้าหมาย",
            value: String(achieved),
            sub: "KPI",
            color: "bg-green-50 text-green-700",
          },
          {
            label: "กำลังดำเนินการ",
            value: String(onTrack),
            sub: "KPI",
            color: "bg-blue-50 text-blue-700",
          },
          {
            label: "ยังไม่เริ่ม",
            value: String(12 - achieved - onTrack),
            sub: "KPI",
            color: "bg-gray-50 text-gray-600",
          },
        ].map((card) => (
          <div key={card.label} className={`rounded-xl p-4 ${card.color.split(" ")[0]}`}>
            <div className={`text-3xl font-bold ${card.color.split(" ")[1]}`}>{card.value}</div>
            <div className="mt-0.5 text-sm text-gray-500">{card.sub}</div>
            <div className="mt-1 text-sm font-medium text-gray-700">{card.label}</div>
          </div>
        ))}
      </div>

      {/* KPI Table */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="font-semibold text-gray-900">KPI ทั้ง 12 ตัว</h2>
          <Link href="/admin/kpi" className="text-sm font-medium text-teal-600 hover:text-teal-700">
            จัดการ KPI →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="w-8 px-6 py-3 text-left font-medium text-gray-500">#</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">ตัวชี้วัด</th>
                <th className="px-4 py-3 text-center font-medium text-gray-500">เป้าหมาย</th>
                <th className="px-4 py-3 text-center font-medium text-gray-500">ผลจริง</th>
                <th className="px-4 py-3 text-center font-medium text-gray-500">ความก้าวหน้า</th>
                <th className="px-4 py-3 text-center font-medium text-gray-500">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {kpiData.map((kpi) => (
                <tr key={kpi.kpi_no} className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-xs text-gray-400">{kpi.kpi_no}</td>
                  <td className="px-4 py-4">
                    <div className="leading-tight font-medium text-gray-900">{kpi.title}</div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="font-semibold text-gray-700">
                      {kpi.target} {kpi.unit}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="font-semibold text-teal-700">
                      {kpi.actual} {kpi.unit}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-teal-500 transition-all"
                          style={{ width: `${kpi.pct}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-xs text-gray-500">{kpi.pct}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[kpi.status as keyof typeof STATUS_STYLES]}`}
                    >
                      {KPI_STATUS_LABELS[kpi.status as keyof typeof KPI_STATUS_LABELS]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "เพิ่มผลิตภัณฑ์", href: "/admin/products", icon: "➕" },
          { label: "บันทึกธุรกรรม", href: "/admin/transactions", icon: "📋" },
          { label: "เพิ่มผู้รับบริการ", href: "/admin/beneficiaries", icon: "👥" },
          { label: "นำเข้าข้อมูล", href: "/admin/settings", icon: "📥" },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-teal-200 hover:shadow-md"
          >
            <span className="text-xl">{action.icon}</span>
            <span className="text-sm font-medium text-gray-700">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
