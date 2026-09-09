import { addons } from "storybook/manager-api"
import { create } from "storybook/theming"

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Songkhla Active Aging",
    brandUrl: "/",
    colorPrimary: "#2e72aa",
    colorSecondary: "#5d9a72",
  }),
})
