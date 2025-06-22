---
title: 部署手册
icon: ic:baseline-install-desktop
sidebar: false
---

- 视频

<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=113933520211714&bvid=BV19MF6efEW3&cid=28185985482&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

## 版本对照表

请阅读下面的版本对照表，选择适合你的版本进行部署！

|latest|指定版本|数据库|系统自适应|
|---|---|---|---|
|latest|4.3.0|默认（pgsql）|x86/arm64|
|latest-pgsql|4.3.0-pgsql|pgsql|x86/arm64|
|latest-mysql|4.3.0-mysql|mysql|x86/arm64|
|latest-sqlite|4.3.0-sqlite|sqlite|x86/arm64|
|latest-sqlserver|4.3.0-sqlserver|sqlserver|x86/arm64|

详情请查看 [DockerHub](https://hub.docker.com/repository/docker/dingdangdog/cashbook/tags)

## docker-compose配置文件说明

> 提示：学会了`docker`，你就学会了在所有支持 `docker` 的机器上部署 `Cashbook`~

**熟练使用Docker的用户可跳过，直接阅读 [Cashbook环境变量详解](#cashbook环境变量详解)**

### 示例

```yaml
services:
  main:
    container_name: cashbook4
    image: dingdangdog/cashbook:latest
    restart: always
    # network_mode: "host"
    volumes:
      - ./data:/app/data
    environment:
      # 环境变量详解请查阅：https://doc.cashbook.oldmoon.top/deploy/#cashbook环境变量详解
      #NUXT_DATA_PATH: "/app/data"
      DATABASE_URL: "postgresql://postgres:postgres@172.17.0.1:5432/cashbook?schema=public"
      NUXT_AUTH_SECRET: "auth_secret"
      NUXT_ADMIN_USERNAME: "admin"
      NUXT_ADMIN_PASSWORD: "fb35e9343a1c095ce1c1d1eb6973dc570953159441c3ee315ecfefb6ed05f4cc"
    ports:
      - 9090:9090
```

<!-- more -->

### 详解

1. **main**：任务名称，可以被其他任务引用；
2. **container_name: cashbook4**：不懂Docker的不需要，懂docker的不用讲；
3. **depends_on**：docker启动依赖项，值是数组，值为其他任务的名称，依赖的任务项成功启动前，当前容器不会启动；
4. **image**：容器启动时使用的镜像；**dingdangdog/cashbook:4.0.1**：镜像全名称，其中 `dingdangdog` 一般为组织名/用户名（发布方），`cashbook` 一般为项目名，`4.0.1` 为镜像版本号；
5. **restart: always**：重启标志，`always` 自动重启，且会在 `Docker` 启动时自动启动；
6. **network_mode: "host"**：网络模式，设置为 `host` 后，采用本地网络模式，所有配置均可以与本地部署一样，但采用后 `ports` 配置将会失效；
7. **volumes**：容器数据卷，用于关联本地与容器内的数据（常见的用法是采用该配置容器内数据保存到本地），值是一组数组，也就是可以配置多个关联关系；
8. **environment**：环境变量，常用来配置一些常量；
9. **ports**：配置端口映射，用于本地端口与容器端口做关联；

## Cashbook环境变量详解

docker的环境变量，一般用于容器内部的一些常量配置，接下来将逐一介绍 `Cashbook` 用到的环境变量：

### 1. DATABASE_URL

> 数据库链接，需要能连上你的数据库【*请自行修改*】
>
> - *示例值*：`postgresql://postgres:postgres@cashbook_db:5432/cashbook?schema=public`

### 2. NUXT_DATA_PATH

> 容器内数据存储未知，现在只有小票图片了【不建议修改，可忽略该配置项】
>
> - *默认值*：`/app/data`

### 3. NUXT_AUTH_SECRET

> 前台登录加密使用的密钥 （随意填写即可，无格式要求）【*建议请自行修改*】
>
> - *示例值*：`auth_secret`

### 4. NUXT_ADMIN_USERNAME

> 后台登录用户名【*请自行修改*】
>
> - *默认*：`admin`

### 5. NUXT_ADMIN_PASSWORD

> 后台登录密码，密码是加密后的，与账号有关联！【*请自行修改*】
>
> - *默认*：`fb35e9343a1c095ce1c1d1eb6973dc570953159441c3ee315ecfefb6ed05f4cc`

生成新密码可前往 `https://cashbook.oldmoon.top/admin/GetPassword`，或独立部署后访问 `[URL]/admin/GetPassword`，将其中的 `[url]` 替换为你的服务地址！

## 部署详解

### 前置工作：生成后台账号密码

**提示：现在的 `Cashbook` 采用了前后台分离设计，后台只有一个超管账户可以登录，因此这个账户（用户名&密码）将非常重要，如果你十分重视你的流水数据，一定要做好保密甚至不定期修改！**

生成方法：可前往演示站的生成页面： <https://cashbook.oldmoon.top/admin/GetPassword> ，填写你的用户名密码后，点击“加密”即可生成加密的密码。

生成后的账号配置为环境变量 `NUXT_ADMIN_USERNAME`，密码配置为环境变量 `NUXT_ADMIN_PASSWORD`。

> **意想不到的小提示：环境变量中配置的密码是加密后的；登录页面输入的密码请仍然使用加密前的！**

### 简述：部署流程

1. 安装 `Docker`（略过）；
2. 创建 `cashbook` 文件夹；
3. 上传/创建`docker-compose.yaml`文件；
4. 在 `cashbook` 文件夹中运行 `sudo docker-compose up -d`，将会自动下载镜像并启动（网络不好可能会下载失败）；

> **提示**：无论是`Cashbook`和`数据库`一起部署，还是只部署 `cashbook`，部署流程都是上面的四步，因此部署流程后续不再介绍，只会介绍一下两种部署方案的区别。

### 方案1. Cashbook与Postgre数据库一起部署

如果你没有现成的（已安装并可用）的 `Postgre` 数据库，则建议使用该方案部署，但该方案有一个问题：这个一起安装的 `Postgre` 数据库如果想提供给其他服务使用，需要进行一些修改！

- docker-compose.yaml 示例

```yaml
services:
  main:
    container_name: cashbook4
    depends_on: 
      - "db"
    image: dingdangdog/cashbook:latest
    restart: always
    # network_mode: "host"
    volumes:
      - ./data:/app/data
    environment:
      # 环境变量详解请查阅：https://doc.cashbook.oldmoon.top/deploy/#cashbook环境变量详解
      #NUXT_DATA_PATH: "/app/data"
      DATABASE_URL: "postgresql://postgres:postgres@cashbook_db:5432/cashbook?schema=public"
      NUXT_AUTH_SECRET: "auth_secret"
      NUXT_ADMIN_USERNAME: "admin"
      NUXT_ADMIN_PASSWORD: "fb35e9343a1c095ce1c1d1eb6973dc570953159441c3ee315ecfefb6ed05f4cc"
    ports:
      - 9090:9090
  db:
    container_name: cashbook_db
    image: postgres
    restart: always
    #network_mode: "host"
    # set shared memory limit when using docker-compose
    shm_size: 128mb
    # or set shared memory limit when deploy via swarm stack
    volumes:
      - ./db:/var/lib/postgresql/data 
    environment:
      #POSTGRES_USER: postgres # 数据库用户名，不填默认为postgres
      POSTGRES_PASSWORD: postgres # 数据库密码 【自行修改！】
      POSTGRES_DB: cashbook
    #ports:
    #  - 5432:5432
```

### 方案2. 只部署Cashbook

如果你已经有了可以直接使用的 `Postgre` 数据库，可以选择只部署 `Cashook`，但是需要你手动创建一个名为`cashbook`的数据库！然后自行修改你的数据库连接应该如何配置！

- docker-compose.yaml 示例

```yaml
services:
  main:
    container_name: cashbook4
    image: dingdangdog/cashbook:latest
    restart: always
    # network_mode: "host"
    volumes:
      - ./data:/app/data
    environment:
      # 环境变量详解请查阅：https://doc.cashbook.oldmoon.top/deploy/#cashbook环境变量详解
      #NUXT_DATA_PATH: "/app/data"
      DATABASE_URL: "postgresql://postgres:postgres@172.17.0.1:5432/cashbook?schema=public"
      NUXT_AUTH_SECRET: "auth_secret"
      NUXT_ADMIN_USERNAME: "admin"
      NUXT_ADMIN_PASSWORD: "fb35e9343a1c095ce1c1d1eb6973dc570953159441c3ee315ecfefb6ed05f4cc"
    ports:
      - 9090:9090
```

## 拓展

### 其他数据库支持

应用户需求，自 `4.1.6` 版本后，增加其他数据库支持的镜像，包括：`mysql`，`sqlite` 等数据库！

> 提醒：部分镜像未经过测试，不保证可以正常运行，请自行尝试！详见：[版本对照表](#版本对照表)

### APP

有群友基于自己的使用开发了APP客户端，请自行了解！

- [cashbook_app](https://github.com/houxiaoyi0722/cashbook_app)
