import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    "",
    // "portfolio",
    {
      text: "使用手册",
      icon: "book",
      prefix: "guide/",
      children: "structure",
    },
    {
      text: "部署教程",
      icon: "ic:baseline-install-desktop",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "常见问题",
      icon: "pajamas:question",
      prefix: "guide/",
      children: "structure",
    },
    {
      text: "开发",
      icon: "laptop-code",
      prefix: "guide/",
      children: "structure",
    },
    {
      text: "Github",
      icon: "skill-icons:github-light",
      link: "https://github.com/dingdangdog/cashbook",
    },
  ],
});
