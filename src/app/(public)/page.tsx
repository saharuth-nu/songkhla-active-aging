import Link from "next/link"

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-white blur-3xl" />
          <div className="absolute right-10 bottom-10 h-96 w-96 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
              โครงการ PSU — Songkhla Active Aging Model ทดสอบใช้งาน
            </div>
            <h1 className="mb-6 text-4xl leading-tight font-bold sm:text-5xl">
              นวัตกรรมสุขภาวะ
              <br />
              <span className="text-emerald-300">ผู้สูงอายุสงขลา</span>
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-teal-100">
              แพลตฟอร์มดิจิทัลกลางสำหรับบริหารจัดการข้อมูล ผลิตภัณฑ์ บริการสุขภาพชุมชน และติดตาม KPI
              โครงการเพื่อสุขภาวะผู้สูงอายุอย่างยั่งยืน
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center rounded-xl bg-white px-6 py-3 font-semibold text-teal-700 shadow-lg transition-colors hover:bg-teal-50"
              >
                ดูผลิตภัณฑ์/บริการ
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center rounded-xl border-2 border-white/60 bg-transparent px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                ลงทะเบียนรับบริการ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {[
              { label: "ผู้รับบริการ", value: "0", unit: "คน", target: "เป้า 30 คน" },
              { label: "ผลิตภัณฑ์/บริการ", value: "0", unit: "รายการ", target: "เป้า 5 รายการ" },
              { label: "การจ้างงาน", value: "0", unit: "คน", target: "เป้า 30 คน" },
              { label: "เครือข่าย", value: "0", unit: "เครือข่าย", target: "เป้า 2 เครือข่าย" },
            ].map((stat) => (
              <div key={stat.label} className="p-4">
                <div className="text-3xl font-bold text-teal-700">{stat.value}</div>
                <div className="text-sm font-medium text-gray-500">{stat.unit}</div>
                <div className="mt-1 text-base font-semibold text-gray-900">{stat.label}</div>
                <div className="mt-0.5 text-xs text-gray-400">{stat.target}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
            บริการและข้อมูลโครงการ
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "🏥",
                title: "ผลิตภัณฑ์/บริการสุขภาพ",
                desc: "ค้นหาและสั่งซื้อผลิตภัณฑ์หรือขอรับบริการสุขภาพชุมชน",
                href: "/products",
                color: "teal",
              },
              {
                icon: "📊",
                title: "ติดตาม KPI โครงการ",
                desc: "ดูความก้าวหน้าและผลลัพธ์ของโครงการแบบ Real-time",
                href: "/impact",
                color: "blue",
              },
              {
                icon: "💡",
                title: "นวัตกรรมสุขภาพ",
                desc: "รวบรวมนวัตกรรมและเทคโนโลยีสุขภาพชุมชน",
                href: "/innovation",
                color: "purple",
              },
              {
                icon: "📚",
                title: "คลังความรู้",
                desc: "คู่มือ องค์ความรู้ และสื่อสุขภาพชุมชน",
                href: "/knowledge",
                color: "amber",
              },
              {
                icon: "🤝",
                title: "เครือข่ายภาคี",
                desc: "เครือข่ายองค์กรและภาคีที่ร่วมดำเนินงาน",
                href: "/partners",
                color: "green",
              },
              {
                icon: "📝",
                title: "ลงทะเบียน",
                desc: "ลงทะเบียนรับบริการหรือแสดงความสนใจในโครงการ",
                href: "/register",
                color: "rose",
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-teal-200 hover:shadow-md"
              >
                <div className="mb-3 text-3xl">{card.icon}</div>
                <div className="mb-2 font-semibold text-gray-900 transition-colors group-hover:text-teal-700">
                  {card.title}
                </div>
                <p className="text-sm leading-relaxed text-gray-500">{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-700 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">ร่วมเป็นส่วนหนึ่งของโครงการ</h2>
          <p className="mb-8 text-lg text-teal-100">
            ลงทะเบียนรับบริการ หรือติดต่อเพื่อร่วมเป็นภาคีเครือข่าย
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="rounded-xl bg-white px-8 py-3 font-semibold text-teal-700 transition-colors hover:bg-teal-50"
            >
              ลงทะเบียน
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border-2 border-white/60 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              ติดต่อทีมงาน
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
