import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Breadcrumbs } from "./Breadcrumbs"

const meta = {
  title: "Public/Navigation/Breadcrumbs",
  component: Breadcrumbs,
  args: {
    items: [
      { href: "/", label: "หน้าแรก" },
      { href: "/products", label: "สินค้าและบริการ" },
      { label: "ประเมินสุขภาพเบื้องต้นในชุมชน" },
    ],
  },
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
