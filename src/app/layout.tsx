import type { Metadata } from "next"
import { inter, notoSansThai } from "./fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "Songkhla Active Aging | นวัตกรรมสุขภาวะผู้สูงอายุ",
  description:
    "แพลตฟอร์มดิจิทัลสำหรับโครงการ Songkhla Active Aging Model — นวัตกรรมกระบวนการมีส่วนร่วมเพื่อสร้างสุขภาวะและเศรษฐกิจสุขภาพผู้สูงอายุอย่างยั่งยืน",
  keywords: ["active aging", "สงขลา", "ผู้สูงอายุ", "สุขภาพชุมชน", "นวัตกรรม"],
  openGraph: {
    title: "Songkhla Active Aging",
    description: "นวัตกรรมสุขภาวะผู้สูงอายุ จังหวัดสงขลา",
    type: "website",
    locale: "th_TH",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body
        className={`${notoSansThai.className} ${notoSansThai.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
