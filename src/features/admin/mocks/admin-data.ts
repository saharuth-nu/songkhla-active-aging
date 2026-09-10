export type AdminModuleKey =
  | "beneficiaries"
  | "services"
  | "trainings"
  | "tech-transfer"
  | "employments"
  | "partners"
  | "innovations"
  | "content"
  | "users"

export type AdminRecord = {
  id: string
  imageCode?: string
  status: "active" | "pending" | "confirmed" | "completed" | "inactive"
  title: string
  values?: Readonly<Record<string, string>>
}

export const adminModules: Record<
  AdminModuleKey,
  { path: string; records: ReadonlyArray<AdminRecord>; singular: string; title: string }
> = {
  beneficiaries: {
    path: "/admin/data/beneficiaries",
    records: [
      {
        id: "BEN-001",
        status: "active",
        title: "คุณสมใจ ใจดี",
        values: {
          ชื่อแสดงผล: "คุณสมใจ ใจดี",
          ช่วงอายุ: "60–69 ปี",
          "พื้นที่ (อำเภอ · ตำบล)": "เมืองสงขลา · บ่อยาง",
          บริการที่ได้รับ: "ประเมินสุขภาพเบื้องต้นในชุมชน",
          ความยินยอมใช้ข้อมูล: "ให้ความยินยอม",
        },
      },
    ],
    singular: "ผู้รับบริการ",
    title: "ผู้รับบริการ",
  },
  services: {
    path: "/admin/data/services",
    records: [
      {
        id: "SRV-001",
        imageCode: "MKT-SRV-01",
        status: "active",
        title: "ประเมินสุขภาพเบื้องต้นในชุมชน",
        values: {
          "ชื่อสินค้า/บริการ": "ประเมินสุขภาพเบื้องต้นในชุมชน",
          ประเภท: "บริการสุขภาพ",
          ผู้ให้บริการ: "ศูนย์สุขภาพชุมชนบ่อยาง",
          "พื้นที่ (อำเภอ · ตำบล)": "เมืองสงขลา · บ่อยาง",
          "ราคา/ช่วงราคา": "ไม่มีค่าใช้จ่าย",
        },
      },
    ],
    singular: "สินค้า/บริการ",
    title: "สินค้าและบริการ",
  },
  trainings: {
    path: "/admin/data/trainings",
    records: [
      {
        id: "TRN-001",
        status: "completed",
        title: "การดูแลสุขภาพด้วยตนเอง",
        values: {
          ชื่อกิจกรรม: "การดูแลสุขภาพด้วยตนเอง",
          รหัสผู้เข้าร่วม: "HP-001",
          "หน่วยงาน/ภาคี": "ศูนย์สุขภาพชุมชนบ่อยาง",
          วันที่จัดกิจกรรม: "2026-08-15",
        },
      },
      {
        id: "TRN-002",
        status: "confirmed",
        title: "พัฒนาบรรจุภัณฑ์ชุมชน",
        values: {
          ชื่อกิจกรรม: "พัฒนาบรรจุภัณฑ์ชุมชน",
          รหัสผู้เข้าร่วม: "ENT-001",
          "หน่วยงาน/ภาคี": "กลุ่มอาชีพสูงวัยคอหงส์",
          วันที่จัดกิจกรรม: "2026-09-20",
        },
      },
    ],
    singular: "รายการพัฒนาศักยภาพ",
    title: "การพัฒนาศักยภาพ",
  },
  "tech-transfer": {
    path: "/admin/data/tech-transfer",
    records: [
      {
        id: "TEC-001",
        status: "completed",
        title: "ชุดประเมินบ้านปลอดภัยฉบับชุมชน",
        values: {
          นวัตกรรม: "ชุดประเมินบ้านปลอดภัยฉบับชุมชน",
          "รหัส/ชื่อผู้รับการถ่ายทอด": "อาสาสมัครชุมชนหัวเขา",
          "หน่วยงาน/ภาคี": "เครือข่ายอาสาสมัครสิงหนคร",
          วันที่ถ่ายทอด: "2026-08-22",
        },
      },
      {
        id: "TEC-002",
        status: "pending",
        title: "แผนที่บริการที่เป็นมิตรกับผู้สูงอายุ",
        values: {
          นวัตกรรม: "แผนที่บริการที่เป็นมิตรกับผู้สูงอายุ",
          "รหัส/ชื่อผู้รับการถ่ายทอด": "ผู้ประสานงานศูนย์เรียนรู้ดิจิทัล",
          "หน่วยงาน/ภาคี": "ศูนย์เรียนรู้ดิจิทัลสะเดา",
          วันที่ถ่ายทอด: "2026-09-18",
        },
      },
    ],
    singular: "รายการถ่ายทอดเทคโนโลยี",
    title: "การถ่ายทอดเทคโนโลยี",
  },
  employments: {
    path: "/admin/data/employments",
    records: [
      {
        id: "EMP-001",
        status: "active",
        title: "EMP-P-001",
        values: {
          รหัสบุคคล: "EMP-P-001",
          ตำแหน่งงาน: "ผู้ช่วยผลิตสินค้าสมุนไพร",
          "หน่วยงาน/ภาคี": "กลุ่มอาชีพสูงวัยคอหงส์",
          วันที่เริ่มงาน: "2026-08-01",
        },
      },
    ],
    singular: "ข้อมูลการจ้างงาน",
    title: "การจ้างงาน",
  },
  partners: {
    path: "/admin/data/partners",
    records: [
      {
        id: "PART-001",
        imageCode: "PUB-PTN-01",
        status: "active",
        title: "ศูนย์สุขภาพชุมชนบ่อยาง",
        values: {
          "ชื่อหน่วยงาน/เครือข่าย": "ศูนย์สุขภาพชุมชนบ่อยาง",
          ประเภทภาคี: "หน่วยบริการสุขภาพ",
          "พื้นที่ (อำเภอ · ตำบล)": "เมืองสงขลา · บ่อยาง",
          ประเภทข้อตกลง: "MOU",
        },
      },
    ],
    singular: "ภาคีเครือข่าย",
    title: "ภาคีเครือข่าย",
  },
  innovations: {
    path: "/admin/data/innovations",
    records: [
      {
        id: "INN-001",
        imageCode: "PUB-INN-01",
        status: "active",
        title: "แผนที่บริการที่เป็นมิตรกับผู้สูงอายุ",
        values: {
          ชื่อนวัตกรรม: "แผนที่บริการที่เป็นมิตรกับผู้สูงอายุ",
          ประเภทนวัตกรรม: "เทคโนโลยี",
          "พื้นที่ (อำเภอ · ตำบล)": "เมืองสงขลา · บ่อยาง",
          ระยะการนำไปใช้: "ทดลองใช้",
        },
      },
    ],
    singular: "นวัตกรรม",
    title: "นวัตกรรม",
  },
  content: {
    path: "/admin/data/content",
    records: [
      {
        id: "CNT-001",
        imageCode: "PUB-CNT-01",
        status: "active",
        title: "5 วิธีจัดบ้านให้ปลอดภัยและเหมาะกับผู้สูงอายุ",
        values: {
          ชื่อเนื้อหา: "5 วิธีจัดบ้านให้ปลอดภัยและเหมาะกับผู้สูงอายุ",
          ประเภทเนื้อหา: "องค์ความรู้",
          วันที่เผยแพร่: "2026-08-12",
        },
      },
    ],
    singular: "เนื้อหา",
    title: "จัดการเนื้อหา",
  },
  users: {
    path: "/admin/data/users",
    records: [
      {
        id: "USR-001",
        status: "active",
        title: "ผู้ดูแลโครงการ",
        values: { ชื่อแสดงผล: "ผู้ดูแลโครงการ", ชื่อผู้ใช้: "admin", บทบาท: "ผู้ดูแลโครงการ" },
      },
      {
        id: "USR-002",
        status: "active",
        title: "ผู้บริหารโครงการ",
        values: {
          ชื่อแสดงผล: "ผู้บริหารโครงการ",
          ชื่อผู้ใช้: "viewer",
          บทบาท: "ผู้บริหาร (ดูข้อมูลเท่านั้น)",
        },
      },
    ],
    singular: "ผู้ใช้",
    title: "ผู้ใช้และสิทธิ์",
  },
}

export const adminStatusLabels = {
  active: "เปิดใช้งาน",
  pending: "รอตรวจสอบ",
  confirmed: "ยืนยันแล้ว",
  completed: "เสร็จสิ้น",
  inactive: "ปิดใช้งาน",
} as const
