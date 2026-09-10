import { config } from "dotenv"
config({ path: ".env.local" })

import { db } from "./index"
import { kpiTargets } from "./schema"

const KPI_TARGETS = [
  {
    kpiCode: "KPI01",
    kpiName: "วิสาหกิจ/กลไกธุรกิจบริการสุขภาพเพื่อสังคม",
    targetValue: "1",
    targetUnit: "แห่ง",
    sortOrder: 1,
    isActive: true,
  },
  {
    kpiCode: "KPI02",
    kpiName: "ผู้ประกอบการ/บุคลากรสุขภาพชุมชนที่ได้รับการพัฒนา",
    targetValue: "10",
    targetUnit: "คน",
    sortOrder: 2,
    isActive: true,
  },
  {
    kpiCode: "KPI03",
    kpiName: "ผู้ได้รับการถ่ายทอดนวัตกรรมสุขภาพ",
    targetValue: "20",
    targetUnit: "คน",
    sortOrder: 3,
    isActive: true,
  },
  {
    kpiCode: "KPI04",
    kpiName: "ผลิตภัณฑ์/บริการสุขภาพชุมชน",
    targetValue: "5",
    targetUnit: "รายการ",
    sortOrder: 4,
    isActive: true,
  },
  {
    kpiCode: "KPI05",
    kpiName: "การหมุนเวียน/กระจายรายได้ในห่วงโซ่คุณค่า",
    targetValue: "15",
    targetUnit: "%",
    sortOrder: 5,
    isActive: true,
  },
  {
    kpiCode: "KPI06",
    kpiName: "การจ้างงานในระบบบริการสุขภาพชุมชน",
    targetValue: "30",
    targetUnit: "คน",
    sortOrder: 6,
    isActive: true,
  },
  {
    kpiCode: "KPI07",
    kpiName: "ประชาชนเข้าถึงบริการสุขภาพเพิ่มขึ้น",
    targetValue: "30",
    targetUnit: "คน",
    sortOrder: 7,
    isActive: true,
  },
  {
    kpiCode: "KPI08",
    kpiName: "เครือข่ายความร่วมมือ",
    targetValue: "2",
    targetUnit: "เครือข่าย",
    sortOrder: 8,
    isActive: true,
  },
  {
    kpiCode: "KPI09",
    kpiName: "นวัตกรรม/เทคโนโลยีเพื่อยกระดับ Value Chain",
    targetValue: "2",
    targetUnit: "นวัตกรรม",
    sortOrder: 9,
    isActive: true,
  },
  {
    kpiCode: "KPI10",
    kpiName: "นวัตกรรมระบบ/การจัดการธุรกิจสุขภาพ",
    targetValue: "2",
    targetUnit: "นวัตกรรม",
    sortOrder: 10,
    isActive: true,
  },
  {
    kpiCode: "KPI11",
    kpiName: "คู่มือ/องค์ความรู้ด้านสุขภาพชุมชน",
    targetValue: "4",
    targetUnit: "ชุด",
    sortOrder: 11,
    isActive: true,
  },
  {
    kpiCode: "KPI12",
    kpiName: "ระบบฐานข้อมูล/แพลตฟอร์มดิจิทัล",
    targetValue: "1",
    targetUnit: "ระบบ",
    sortOrder: 12,
    isActive: true,
  },
]

async function seed() {
  console.log("Seeding KPI targets...")
  await db.insert(kpiTargets).values(KPI_TARGETS).onConflictDoNothing()
  console.log(`Inserted ${KPI_TARGETS.length} KPI targets.`)
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
