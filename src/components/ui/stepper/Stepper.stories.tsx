import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Stepper } from "./Stepper"

const meta = {
  title: "Components/UI/Stepper",
  component: Stepper,
  args: {
    current: 2,
    items: ["เลือกบริการ", "กรอกข้อมูล", "ตรวจสอบ", "ยืนยันคำขอ"],
  },
  decorators: [
    (Story) => (
      <div style={{ width: "min(52rem, 92vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

export const InProgress: Story = {}
export const FirstStep: Story = { args: { current: 1 } }
export const FinalStep: Story = { args: { current: 4 } }
