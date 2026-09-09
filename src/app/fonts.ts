import { Inter, Noto_Sans_Thai } from "next/font/google"

export const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["latin", "thai"],
  display: "swap",
})

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})
