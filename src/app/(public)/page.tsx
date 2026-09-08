import Link from "next/link"

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-1.5 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              โครงการ PSU — Songkhla Active Aging Model ทดสอบใช้งานอีกครั้ง
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              นวัตกรรมสุขภาวะ<br />
              <span className="text-emerald-300">ผู้สูงอายุสงขลา</span>
            </h1>
            <p className="text-lg text-teal-100 leading-relaxed mb-8 max-w-2xl">
              แพลตฟอร์มดิจิทัลกลางสำหรับบริหารจัดการข้อมูล ผลิตภัณฑ์ บริการสุขภาพชุมชน
              และติดตาม KPI โครงการเพื่อสุขภาวะผู้สูงอายุอย่างยั่งยืน
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 bg-white text-teal-700 font-semibold rounded-xl hover:bg-teal-50 transition-colors shadow-lg"
              >
                ดูผลิตภัณฑ์/บริการ
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center px-6 py-3 bg-transparent text-white font-semibold rounded-xl border-2 border-white/60 hover:bg-white/10 transition-colors"
              >
                ลงทะเบียนรับบริการ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "ผู้รับบริการ", value: "0", unit: "คน", target: "เป้า 30 คน" },
              { label: "ผลิตภัณฑ์/บริการ", value: "0", unit: "รายการ", target: "เป้า 5 รายการ" },
              { label: "การจ้างงาน", value: "0", unit: "คน", target: "เป้า 30 คน" },
              { label: "เครือข่าย", value: "0", unit: "เครือข่าย", target: "เป้า 2 เครือข่าย" },
            ].map((stat) => (
              <div key={stat.label} className="p-4">
                <div className="text-3xl font-bold text-teal-700">{stat.value}</div>
                <div className="text-sm font-medium text-gray-500">{stat.unit}</div>
                <div className="text-base font-semibold text-gray-900 mt-1">{stat.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{stat.target}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            บริการและข้อมูลโครงการ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-teal-200 transition-all group"
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <div className="font-semibold text-gray-900 group-hover:text-teal-700 mb-2 transition-colors">
                  {card.title}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ร่วมเป็นส่วนหนึ่งของโครงการ
          </h2>
          <p className="text-teal-100 mb-8 text-lg">
            ลงทะเบียนรับบริการ หรือติดต่อเพื่อร่วมเป็นภาคีเครือข่าย
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-3 bg-white text-teal-700 font-semibold rounded-xl hover:bg-teal-50 transition-colors"
            >
              ลงทะเบียน
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border-2 border-white/60 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              ติดต่อทีมงาน
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
