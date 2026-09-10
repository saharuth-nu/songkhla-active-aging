import type { Preview } from "@storybook/nextjs-vite"
import { inter, notoSansThai } from "../src/app/fonts"
import "../src/app/globals.css"

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={`${notoSansThai.className} ${notoSansThai.variable} ${inter.variable}`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      options: {
        desktop: {
          name: "Desktop 1280 × 900",
          styles: { width: "1280px", height: "900px" },
        },
        mobile: {
          name: "Mobile 375 × 812",
          styles: { width: "375px", height: "812px" },
        },
      },
    },
  },
  initialGlobals: {
    viewport: { value: "desktop", isRotated: false },
  },
  tags: ["autodocs"],
}

export default preview
