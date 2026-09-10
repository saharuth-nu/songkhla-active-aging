import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Progress } from "./Progress"

const meta = {
  title: "Components/UI/Progress",
  component: Progress,
  args: { label: "ความคืบหน้า KPI", value: 68 },
  decorators: [
    (Story) => (
      <div style={{ width: "min(36rem, 90vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Complete: Story = { args: { value: 100 } }
