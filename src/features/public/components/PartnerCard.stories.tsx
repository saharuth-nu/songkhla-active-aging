import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PartnerCard } from "./PartnerCard"

const meta = {
  title: "Public/Cards/PartnerCard",
  component: PartnerCard,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 560 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    area: "เมืองสงขลา · บ่อยาง",
    href: "/contact?partner=PART-001",
    id: "PUB-PTN-01",
    name: "ศูนย์สุขภาพชุมชนบ่อยาง",
    summary: "สนับสนุนการประเมินสุขภาพและให้คำแนะนำเบื้องต้นในชุมชน",
    type: "หน่วยบริการสุขภาพ",
  },
} satisfies Meta<typeof PartnerCard>

export default meta
type Story = StoryObj<typeof meta>

export const PlaceholderLogo: Story = {}
