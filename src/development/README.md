---
title: 开发指南
icon: laptop-code
sidebar: false
---

## 开发环境

- Postgre 数据库
- Nodejs 18+

### 开发环境更新表结构

```sh
npx prisma migrate dev --name <migration-name>
```

- `<migration-name>` 是迁移的名称，通常描述你所做的更改，例如 `add-age-to-user` 或 `create-post-table`。
- `npx prisma migrate dev` 会生成 SQL 迁移文件，并自动应用到开发环境的数据库中。

示例：

```sh
npx prisma migrate dev --name add-age-to-user
```

### Docker

```sh
docker build -t dingdangdog/cashbook:4.0.5 .

docker save -o cashbook.4.0.5.tar dingdangdog/cashbook:4.0.5

docker load -i cashbook.4.0.5.tar
```
