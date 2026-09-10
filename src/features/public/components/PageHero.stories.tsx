import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PageHero } from "./PageHero"

const meta = {
  title: "Public/Layout/PageHero",
  component: PageHero,
  parameters: { layout: "fullscreen" },
  args: {
    description: "แนวคิดและเครื่องมือที่โครงการกับภาคีทดลองใช้ในพื้นที่",
    image: {
      id: "PUB-HERO-INNOVATION-01",
      src: "/img/PUB-HERO-INNOVATION-01.png",
      width: 1536,
      height: 1024,
      alt: "ผู้สูงอายุและเจ้าหน้าที่ใช้เครื่องมือในชุมชน",
    },
    title: "นวัตกรรมเพื่อการใช้ชีวิตอย่างมีคุณภาพ",
  },
} satisfies Meta<typeof PageHero>

export default meta
type Story = StoryObj<typeof meta>

export const WithPhoto: Story = {}

export const WithoutPhoto: Story = {
  args: { image: undefined, title: "ภาคีเครือข่าย" },
}
