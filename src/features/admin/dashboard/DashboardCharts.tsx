"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  LabelList,
  Legend,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

type ProgressDatum = { id: string; percent: number; status: string }
const colors = { attention: "#b45450", progress: "#a97822", reached: "#4f8b65" } as const

export function KpiProgressChart({ records }: { records: ReadonlyArray<ProgressDatum> }) {
  return (
    <div aria-label="ความคืบหน้าตัวชี้วัดตามตัวกรอง" className="report-chart__canvas" role="img">
      <ResponsiveContainer height={420} width="100%">
        <BarChart
          data={[...records]}
          layout="vertical"
          margin={{ bottom: 34, left: 4, right: 40, top: 20 }}
        >
          <CartesianGrid horizontal={false} stroke="#dbe2e5" strokeDasharray="4 4" />
          <XAxis
            domain={[0, 120]}
            tickFormatter={(value) => `${value}%`}
            ticks={[0, 20, 40, 60, 80, 100, 120]}
            type="number"
          />
          <YAxis
            axisLine={false}
            dataKey="id"
            interval={0}
            tickLine={false}
            type="category"
            width={48}
          />
          <ReferenceLine
            label={{ fill: "#7c3f3d", position: "insideTopRight", value: "เป้าหมาย 100%" }}
            stroke="#9f5b57"
            strokeDasharray="4 3"
            x={100}
          />
          <Bar dataKey="percent" isAnimationActive={false} name="ความคืบหน้า" radius={[0, 5, 5, 0]}>
            {records.map((item) => (
              <Cell fill={colors[item.status as keyof typeof colors]} key={item.id} />
            ))}
            <LabelList
              dataKey="percent"
              fill="#ffffff"
              fontWeight={700}
              formatter={(value: unknown) => String(value)}
              position="insideRight"
            />
          </Bar>
          <Legend content={<KpiLegend records={records} />} verticalAlign="bottom" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function KpiStatusChart({
  attention,
  progress,
  reached,
}: {
  attention: number
  progress: number
  reached: number
}) {
  const data = [
    { fill: colors.reached, name: "บรรลุ", value: reached },
    { fill: colors.progress, name: "กำลังดำเนินการ", value: progress },
    { fill: colors.attention, name: "ต้องเร่งรัด", value: attention },
  ]
  return (
    <div aria-label="จำนวน KPI แยกตามสถานะ" className="report-chart__canvas" role="img">
      <ResponsiveContainer height={320} width="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius="52%"
            isAnimationActive={false}
            outerRadius="80%"
            paddingAngle={0}
            stroke="#ffffff"
          >
            {data.map((item) => (
              <Cell fill={item.fill} key={item.name} />
            ))}
            <Label
              content={({ viewBox }) => {
                if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) return null
                return (
                  <text
                    dominantBaseline="middle"
                    fill="#25394a"
                    textAnchor="middle"
                    x={viewBox.cx}
                    y={viewBox.cy}
                  >
                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) - 12}>
                      ทั้งหมด
                    </tspan>
                    <tspan fontSize="20" x={viewBox.cx} y={(viewBox.cy || 0) + 18}>
                      {reached + progress + attention}
                    </tspan>
                  </text>
                )
              }}
              position="center"
            />
          </Pie>
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

function KpiLegend({ records }: { records: ReadonlyArray<ProgressDatum> }) {
  return (
    <div className="report-kpi-legend">
      {records.map((item) => (
        <span key={item.id}>
          <i style={{ background: colors[item.status as keyof typeof colors] }} />
          {item.id}
        </span>
      ))}
    </div>
  )
}
