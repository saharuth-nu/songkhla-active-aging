import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Alert } from "./Alert"

const meta = {
  title: "Components/UI/Alert",
  component: Alert,
  decorators: [
    (Story) => (
      <div style={{ width: "min(42rem, 90vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Information: Story = {
  args: { message: "ข้อมูลของคุณถูกเก็บไว้ในเบราว์เซอร์นี้", title: "ข้อมูลตัวอย่าง" },
}
export const Danger: Story = {
  args: {
    message: "กรุณากรอกรหัสในรูปแบบ REQ-0001",
    title: "รูปแบบรหัสไม่ถูกต้อง",
    variant: "danger",
  },
}
