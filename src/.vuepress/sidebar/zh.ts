import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    // "portfolio",
    {
      text: "使用说明",
      icon: "book",
      prefix: "guide/",
      link: "guide/",
      children: "structure",
    },
    {
      text: "部署手册",
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
      text: "开发指南",
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
