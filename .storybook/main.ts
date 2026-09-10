import type { StorybookConfig } from "@storybook/nextjs-vite"

const config = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  staticDirs: ["../public"],
  docs: {
    defaultName: "Documentation",
  },
  viteFinal: async (viteConfig) => ({
    ...viteConfig,
    optimizeDeps: {
      ...viteConfig.optimizeDeps,
      include: [
        ...(viteConfig.optimizeDeps?.include ?? []),
        "@radix-ui/react-label",
        "@radix-ui/react-progress",
        "@radix-ui/react-tooltip",
        "lucide-react",
      ],
    },
  }),
} satisfies StorybookConfig

export default config
