---
title: 部署
icon: ic:baseline-install-desktop
sidebar: false
---

- B站视频

<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=113933520211714&bvid=BV19MF6efEW3&cid=28185985482&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

## Docker学习（docker-compose.yaml说明）

> 熟练使用Docker的用户可跳过，直接阅读[Cashbook环境变量详解](#Cashbook环境变量详解)

### 示例

```yaml
services:
  main:
    container_name: cashbook4
    depends_on: 
      - "db"
    image: dingdangdog/cashbook:4.0.1
    restart: always
    # network_mode: "host"
    volumes:
      - ./data:/app/data # 数据挂载到本地，目前只会存储小票数据，不建议修改
    environment:
      DATABASE_URL: "postgresql://postgres:postgres@cashbook_db:5432/cashbook?schema=public" # 数据库链接，【请自行修改！与你的数据库一致】
      NUXT_DATA_PATH: "/app/data" # 数据存储未知，现在只有小票图片了，不建议修改
      NUXT_APP_URL: "https://cashbook.oldmoon.top" # 服务根路径，如果有端口号，需要加上端口号
      NUXT_AUTH_ORIGIN: "https://cashbook.oldmoon.top/api/auth" # 登录授权相关接口地址 【请自行修改域名/IP！最后要以 /api/auth 结尾！】
      NUXT_AUTH_SECRET: "auth_secret" # 前台登录加密使用的密钥 【自行修改！】
      NUXT_ADMIN_USERNAME: "admin" # 后台登录用户名
      # 【自行修改】后他登录密码，密码是加密后的，生成密码可前往 https://cashbook.oldmoon.top/admin/GetPassword 或独立部署后访问 `你的url/admin/GetPassword`
      NUXT_ADMIN_PASSWORD: "fb35e9343a1c095ce1c1d1eb6973dc570953159441c3ee315ecfefb6ed05f4cc"
    ports:
      - 9090:9090 # 账本开放端口 【自行修改！】
```


<!-- more -->


### Docker-Compose主要配置

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

docker环境变量，一般用于容器内部的一些常量配置


**DATABASE_URL**【*请自行修改*】

> 数据库链接，需要能连上你的数据库
> 
> - *示例值*：`postgresql://postgres:postgres@cashbook_db:5432/cashbook?schema=public`



**NUXT_DATA_PATH**【不建议修改】

> 数据存储未知，现在只有小票图片了
> 
> - *示例值*：`/app/data`



**NUXT_APP_URL**【*请自行修改*】

> 自行部署服务后，用于访问服务的根路径，如果有端口号，需要加上端口号
> 
> - *示例值*：`https://cashbook.oldmoon.top`



**NUXT_AUTH_ORIGIN**【*请自行修改*】

> 登录授权相关接口地址，需要修改为你的域名/IP！最后要以 /api/auth 结尾！一般就是你的 `NUXT_APP_URL值/api/auth`
> 
> - *示例值*：`https://cashbook.oldmoon.top/api/auth`



**NUXT_AUTH_SECRET** 【*请自行修改*】

> 前台登录加密使用的密钥 （随意填写即可，无格式要求）
> 
> - *示例值*：`auth_secret`



**NUXT_ADMIN_USERNAME**【*请自行修改*】

> 后台登录用户名
> 
> - *示例值*：`admin`



**NUXT_ADMIN_PASSWORD**【*请自行修改*】

> 后台登录密码，密码是加密后的，生成密码可前往 `https://cashbook.oldmoon.top/admin/GetPassword` 生成，或独立部署后访问 `NUXT_APP_URL值/admin/GetPassword` 
> 
> - *示例值*：`fb35e9343a1c095ce1c1d1eb6973dc570953159441c3ee315ecfefb6ed05f4cc`



## 部署详解

### 前置工作：生成后台账号密码

**提示：现在的 `Cashbook` 采用了前后台分离设计，后台只有一个超管账户可以登录，因此这个账户（用户名&密码）将非常重要，如果你十分重视你的流水数据，一定要做好保密甚至不定期修改！**

生成方法：可前往演示站的生成页面： https://cashbook.oldmoon.top/admin/GetPassword ，填写你的用户名密码后，点击“加密”即可生成加密的密码。

生成后的账号配置为环境变量 `NUXT_ADMIN_USERNAME`，密码配置为环境变量 `NUXT_ADMIN_PASSWORD`。

> **意想不到的小提示：环境变量中配置的密码是加密后的；登录页面输入的密码请仍然使用加密前的！**

### 简述：部署流程

1. 安装 `Docker`（略过）；
2. 创建 `cashbook` 文件夹；
3. 上传/创建`docker-compose.yaml`文件；
4. 在 `cashbook` 文件夹中运行 `sudo docker-compose up -d`，将会自动下载镜像并启动（网络不好可能会下载失败）；

> **提示**：无论是`Cashbook`和`数据库`一起部署，还是只部署 `cashbook`，部署流程都是上面的四步，因此部署流程后续不再介绍，只会介绍一下两种部署方案的区别。



### 一、Cashbook与Postgre数据库一起部署

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
      - ./data:/app/data # 数据挂载到本地，不建议修改
    environment:
      DATABASE_URL: "postgresql://postgres:postgres@cashbook_db:5432/cashbook?schema=public" # 数据库链接，【请自行修改！与你的数据库一致】
      NUXT_DATA_PATH: "/app/data" # 数据存储未知，现在只有小票图片了，不建议修改
      NUXT_APP_URL: "https://cashbook.oldmoon.top" # 服务根路径，如果有端口号，需要加上端口号
      NUXT_AUTH_ORIGIN: "https://cashbook.oldmoon.top/api/auth" # 登录授权相关接口地址 【请自行修改域名/IP！最后要以 /api/auth 结尾！】
      NUXT_AUTH_SECRET: "auth_secret" # 前台登录加密使用的密钥 【自行修改！】
      NUXT_ADMIN_USERNAME: "admin" # 后台登录用户名
      # 【自行修改】后台登录密码，密码是加密后的，生成密码可前往 https://cashbook.oldmoon.top/admin/GetPassword 或独立部署后访问 `你的url/admin/GetPassword`
      NUXT_ADMIN_PASSWORD: "fb35e9343a1c095ce1c1d1eb6973dc570953159441c3ee315ecfefb6ed05f4cc"
    ports:
      - 9090:9090 # 账本开放端口 【自行修改！】
  db:
    container_name: cashbook_db
    image: postgres
    restart: always
    #network_mode: "host"
    # set shared memory limit when using docker-compose
    shm_size: 128mb
    # or set shared memory limit when deploy via swarm stack
    volumes:
      - ./db:/var/lib/postgresql/data # 数据库容器数据挂载到本地，不建议修改
    environment:
      #POSTGRES_USER: postgres # 数据库用户名，不填默认为postgres
      POSTGRES_PASSWORD: postgres # 数据库密码 【自行修改！】
      POSTGRES_DB: cashbook
    #ports:
    #  - 5432:5432 # 数据库端口，想要远程连接请放开注释，并建议自行修改端口
```



### 二、只部署Cashbook

如果你已经有了可以直接使用的 `Postgre` 数据库，可以选择只部署 `Cashook`，但是请自行尝试你的数据库连接应该如何配置！

- docker-compose.yaml 示例

```yaml
services:
  main:
    container_name: cashbook4
    image: dingdangdog/cashbook:latest
    restart: always
    # network_mode: "host"
    volumes:
      - ./data:/app/data # 数据挂载到本地，不建议修改
    environment:
      DATABASE_URL: "postgresql://postgres:postgres@172.17.0.1:5432/cashbook?schema=public" # 数据库链接，【请自行修改！与你的数据库一致】
      NUXT_DATA_PATH: "/app/data" # 数据存储未知，现在只有小票图片了，不建议修改
      NUXT_APP_URL: "https://cashbook.oldmoon.top" # 服务根路径，如果有端口号，需要加上端口号
      NUXT_AUTH_ORIGIN: "https://cashbook.oldmoon.top/api/auth" # 登录授权相关接口地址 【请自行修改域名/IP！最后要以 /api/auth 结尾！】
      NUXT_AUTH_SECRET: "auth_secret" # 前台登录加密使用的密钥 【自行修改！】
      NUXT_ADMIN_USERNAME: "admin" # 后台登录用户名
      # 【自行修改】后台登录密码，密码是加密后的，生成密码可前往 https://cashbook.oldmoon.top/admin/GetPassword 或独立部署后访问 `你的url/admin/GetPassword`
      NUXT_ADMIN_PASSWORD: "fb35e9343a1c095ce1c1d1eb6973dc570953159441c3ee315ecfefb6ed05f4cc"
    ports:
      - 9090:9090 # 账本开放端口 【自行修改！】
```
