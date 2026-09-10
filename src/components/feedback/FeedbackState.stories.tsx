import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FeedbackState } from "./FeedbackState"

const meta = {
  title: "Components/Feedback/System State",
  component: FeedbackState,
  args: { kind: "loading" },
  decorators: [
    (Story) => (
      <div style={{ width: "min(48rem, 92vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FeedbackState>

export default meta
type Story = StoryObj<typeof meta>

export const Loading: Story = {}
export const Empty: Story = { args: { kind: "empty" } }
export const Error: Story = { args: { kind: "error", onRetry: () => undefined } }
