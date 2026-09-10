import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Badge, StatusBadge } from "./Badge"

const meta = {
  title: "Components/UI/Badges",
  component: Badge,
  args: { children: "บริการ" },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Categories: Story = {
  args: { children: "บริการ" },
  render: () => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Badge>บริการ</Badge>
      <Badge variant="innovation">นวัตกรรม</Badge>
      <Badge variant="content">องค์ความรู้</Badge>
    </div>
  ),
}

export const Statuses: Story = {
  args: { children: "บริการ" },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      <StatusBadge status="pending" />
      <StatusBadge status="confirmed" />
      <StatusBadge status="completed" />
      <StatusBadge status="cancelled" />
    </div>
  ),
}
