import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SectionHeading } from "./SectionHeading"

const meta = {
  title: "Public/Layout/SectionHeading",
  component: SectionHeading,
  args: {
    action: { href: "/products", label: "ดูทั้งหมด" },
    description: "ตัวอย่างบริการจากหลายพื้นที่และผู้ให้บริการ",
    eyebrow: "Service discovery",
    id: "storybook-section-title",
    title: "สินค้าและบริการแนะนำ",
  },
} satisfies Meta<typeof SectionHeading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
