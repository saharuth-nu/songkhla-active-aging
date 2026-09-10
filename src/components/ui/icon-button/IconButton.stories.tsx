import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ArrowRight, Pencil } from "lucide-react"
import { IconButton } from "./IconButton"

const meta = {
  title: "Components/UI/Icon Button",
  component: IconButton,
  args: { icon: <ArrowRight aria-hidden="true" />, label: "ดูรายละเอียด" },
  parameters: { layout: "centered" },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Public: Story = {}
export const AdminTooltip: Story = {
  args: { icon: <Pencil aria-hidden="true" />, label: "แก้ไข", tooltip: true },
}
export const Disabled: Story = { args: { disabled: true } }
