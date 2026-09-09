import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Card } from "./Card"

const meta = {
  title: "Components/UI/Card",
  component: Card,
  args: {
    children: (
      <>
        <h3>บริการดูแลสุขภาพที่บ้าน</h3>
        <p>บริการจากเครือข่ายในพื้นที่สำหรับผู้สูงอายุและครอบครัว</p>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "min(28rem, 90vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Public: Story = {}
export const Workspace: Story = { args: { mode: "workspace" } }
