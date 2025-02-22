import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  head: [["link", { rel: "icon", href: "/favicon.png" }]],
  locales: {
    "/": {
      lang: "en-US",
      title: "Cashbook官网",
      description: "Cashbook官网",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Cashbook官网",
      description: "Cashbook官网",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
