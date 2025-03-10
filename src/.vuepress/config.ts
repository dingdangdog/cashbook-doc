import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  // 设置默认语言为中文
  lang: "zh-CN",
  title: "Cashbook",
  description: "Cashbook 是一个基于 Nuxt3 + PostgreSQL 的现代账本应用。",

  // SEO 优化: 添加各种元标签
  head: [
    ["link", { rel: "icon", href: "/favicon.png" }],
    // 添加关键词 meta 标签
    [
      "meta",
      {
        name: "keywords",
        content:
          "Cashbook,账本,docker,部署,记账,Nuxt3,PostgreSQL,财务管理,个人理财",
      },
    ],
    // 添加作者信息
    ["meta", { name: "author", content: "DingDangDog" }],
    // 添加robots标签，允许搜索引擎索引和跟踪链接
    ["meta", { name: "robots", content: "index,follow" }],
    // 添加Open Graph协议标签，优化社交媒体分享效果
    ["meta", { property: "og:title", content: "Cashbook" }],
    [
      "meta",
      {
        property: "og:description",
        content: "Cashbook 是一个基于 Nuxt3 + PostgreSQL 的现代账本应用。",
      },
    ],
    ["meta", { property: "og:type", content: "website" }],
    [
      "meta",
      { property: "og:url", content: "https://doc.cashbook.oldmoon.top" },
    ],
    ["meta", { property: "og:image", content: "/favicon.png" }],
    // 添加Twitter卡片标签
    ["meta", { name: "twitter:card", content: "summary" }],
    ["meta", { name: "twitter:title", content: "Cashbook" }],
    [
      "meta",
      {
        name: "twitter:description",
        content: "Cashbook 是一个基于 Nuxt3 + PostgreSQL 的现代账本应用。",
      },
    ],
  ],

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
