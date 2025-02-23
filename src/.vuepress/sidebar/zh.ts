import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    // "portfolio",
    {
      text: "使用手册",
      icon: "book",
      prefix: "guide/",
      link: "guide/",
      children: "structure",
    },
    {
      text: "部署教程",
      icon: "ic:baseline-install-desktop",
      prefix: "deploy/",
      link: "deploy/",
      children: "structure",
    },
    {
      text: "常见问题",
      icon: "pajamas:question",
      prefix: "question/",
      link: "question/",
      children: "structure",
    },
    {
      text: "开发",
      icon: "laptop-code",
      prefix: "development/",
      link: "development/",
      children: "structure",
    },
    {
      text: "Github",
      icon: "skill-icons:github-light",
      link: "https://github.com/dingdangdog/cashbook",
    },
  ],
});
