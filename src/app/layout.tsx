import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
