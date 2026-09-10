import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { services } from "../mocks/public-data"
import { ContentCard } from "./ContentCard"

const meta = {
  title: "Public/Cards/ContentCard",
  component: ContentCard,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    area: "เมืองสงขลา",
    description: services[0].excerpt,
    href: `/products/${services[0].id}`,
    image: services[0].image,
    provider: services[0].provider,
    supportingIcon: "tag",
    supportingText: services[0].priceLabel,
    tag: services[0].type,
    title: services[0].title,
    variant: "service",
  },
} satisfies Meta<typeof ContentCard>

export default meta
type Story = StoryObj<typeof meta>

export const Service: Story = {}
