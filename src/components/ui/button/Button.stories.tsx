import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ArrowRight } from "lucide-react"
import { Button, ButtonLink } from "./Button"

const meta = {
  title: "Components/UI/Button",
  component: Button,
  args: { children: "ลงทะเบียน" },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const Secondary: Story = { args: { children: "ดูรายละเอียด", variant: "secondary" } }
export const NavigationLink: Story = {
  args: { children: "ดูรายละเอียด", variant: "secondary" },
  render: () => (
    <ButtonLink href="#storybook-preview-wrapper" variant="secondary">
      ดูรายละเอียด
    </ButtonLink>
  ),
}
export const WithIcon: Story = {
  args: { children: "ดูทั้งหมด", icon: <ArrowRight aria-hidden="true" /> },
}
export const Disabled: Story = { args: { disabled: true } }
export const Workspace: Story = { args: { children: "บันทึก", mode: "workspace" } }
export const WorkspacePrimary: Story = {
  args: { children: "บันทึก", mode: "workspace", variant: "primary" },
}
export const Destructive: Story = {
  args: { children: "ลบข้อมูล", mode: "workspace", variant: "danger" },
}
export const OnDark: Story = {
  args: { children: "ติดต่อโครงการ", onDark: true },
  decorators: [
    (Story) => (
      <div style={{ background: "#17324a", padding: "2rem" }}>
        <Story />
      </div>
    ),
  ],
}
