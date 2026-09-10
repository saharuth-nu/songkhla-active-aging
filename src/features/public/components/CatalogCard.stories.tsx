import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { services } from "../mocks/public-data"
import { CatalogCard } from "./CatalogCard"

const meta = {
  title: "Public/Cards/CatalogCard",
  component: CatalogCard,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    actionHref: "/request/start?item=SRV-001&intent=request&source=Website",
    actionLabel: "ขอรับบริการ",
    detailHref: "/products/SRV-001",
    item: services[0],
  },
} satisfies Meta<typeof CatalogCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
