---
title: 常见问题
icon: pajamas:question
sidebar: false
---

## 导入有重复数据怎么办？

很抱歉~没办法！由于数据的不确定性，代码自动去重的复杂性较高，所以暂时没有添加自动去重的功能！

建议您固定时间间隔导出数据，以此避免数据重复的可能性！

> 可能会增加自助去重的功能：`自动筛选出可疑数据，人工确认删除重复数据`。敬请期待！

## 后台怎么进？

你的网站访问URL拼接上 `/admin` 即可，如：`https://cashbook.oldmoon.top/admin`。

## 为什么一直密码错误？

首先请你确认：是否是第一次部署？如果是，你需要登录后台（`管理端`）并创建用户后，使用创建的用户才能登录前台（`记账端`），后台的入口是 `服务地址/admin`。

如果你已经创建过前台用户还是提示密码错误，建议到后台修改用户密码再试！

## 如何创建用户？

**前台用户** 有两个创建方式：

- 后台管理-用户菜单中，可以新增用户；
- 注册功能：前台注册。

**后台用户** 有且仅有一个，无法新增，账号密码通过docker环境变量配置，修改后需要重新启动容器。

<!-- more -->

## 怎么没有注册入口？

注册功能默认是关闭的，需要在后台管理的 `系统管理` 中，开放注册功能后，才可以在前台登录页面进行注册。

## 如何使用现有的数据库？

1. 手动创建一个名为 `cashbook` 的数据库（`不需要建表，只需要建库即可`）；
2. 修改cashbook数据库连接，只要能连上数据库即可。

以上两步完成后，就会可以使用现有数据库了。

## 不支持arm架构的服务器？如何在arm架构的服务器部署？

请手动修改 `docker` 镜像版本号，详见：[版本对照表](https://doc.cashbook.oldmoon.top/deploy/#版本对照表)

## 支持什么数据库？

~~目前仅支持使用 `postgre` 数据库！暂不支持其他数据库。~~ 详见下一个问题

## 支持MySQL数据库吗？支持Mongo数据库吗？

~~目前仅支持使用 `postgre` 数据库！暂不支持其他数据库。~~

应用户需求，自 `4.1.4` 版本后，增加其他数据库支持的镜像，包括：`mysql`，`sqlite`！

使用方式为Docker镜像版本号后缀加上 `-mysql` / `-sqlite`，比如 `4.1.4-mysql` / `4.1.4-sqlite` / `4.1.4-pgsql`。

无后缀镜像仍需要 `pgsql` 支持。

> 提醒：未经过测试，请自行尝试！
