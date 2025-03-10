---
home: true
icon: house
title: Cashbook官网
heroImage: /favicon.png
# bgImage: https://theme-hope-assets.vuejs.press/bg/6-light.svg
# bgImageDark: https://theme-hope-assets.vuejs.press/bg/6-dark.svg
# bgImageStyle:
#   background-attachment: fixed
heroText: Cashbook
tagline: 适合家庭部署的私人记账本！
actions:
  - text: 部署手册
    icon: ic:baseline-install-desktop
    link: ./deploy/
    type: primary

  - text: 在线体验
    icon: carbon:demo
    link: https://cashbook.oldmoon.top

# highlights:
#   - header: 易于安装
#     image: /assets/image/box.svg
#     bgImage: https://theme-hope-assets.vuejs.press/bg/3-light.svg
#     bgImageDark: https://theme-hope-assets.vuejs.press/bg/3-dark.svg
#     highlights:
#       - title: 运行 <code>pnpm create vuepress-theme-hope hope-project</code> 以创建一个新的主题项目。
#       - title: 在已有项目根目录下运行 <code>pnpm create vuepress-theme-hope add .</code> 以在项目中添加主题。

copyright: oldmoon.top
footer: MIT 协议, 版权所有 © 2023-至今 DingDangDog
---

![cashbook](/demo-dark.jpg)

## 主要功能

- [x] 前台后台分离，独立后台方便对系统进行管理；
- [x] 前台注册功能；
- [x] 明暗主题；
- [x] `Docker` 部署；
- [x] 支持 *支付宝CSV* 账单文件导入；
- [x] 支持 *微信CSV* 账单文件导入；
- [x] 支持 *京东金融CSV* 账单文件导入；
- [x] 三方数据导入时，消费类型自动转换（可以自行配置转换结果）；
- [x] 支持 *模板导入* ；
- [x] 直观的消费日历看板；
- [x] 月度账单分析（后期集成个AI？）；
- [x] 美观的数据分析图表，包括图标如下：
  - [x] 支出类型统计饼图；
  - [x] 支付方式统计饼图；
  - [x] 每日流水统计曲线图；
  - [x] 每月流水统计柱状图；
  - [x] 流水归属统计饼图；
- [x] 多用户模式，用户之间数据隔离；
- [x] 多账本模式，账本之间数据独立；
- [x] 需要数据库：Postgre数据库；
- [x] 可以上传小票图片；
- [x] 账本数据快速迁移（账本数据导入/导出）；
- [x] 系统数据快速迁移（系统数据导入/导出）；
- [x] 自助平账（收入/支出抵消）；
- [x] 共享账本（多用户共用一个账本）；
- [ ] 移动端适配（难搞）；
- [ ] 主题系统（没做过，不会做，但想做）；
- [ ] ……
