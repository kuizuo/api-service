<p align="center">
  <img src="https://api.iconify.design/carbon:api-1.svg" width="50" height="50" />
</p>
<p align="center">
  <i>Artwork from <a href="https://nuxt.com/">Nuxt</a></i>
</p>
<pre align="center">
🧪 整理稳定、快速、好用的 API 接口
</pre>

<p align="center">
<br>
<a href="https://api.kuizuo.me">🖥 Online Preview</a>
<br><br>
<a href="https://stackblitz.com/github/kuizuo/api-service"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt=""></a>
</p>

<p align="center">
  <a href="https://github.com/kuizuo/api-service"><img alt="size" src="https://img.shields.io/github/stars/kuizuo/api-service?style=flat"></a>
  <a href="https://www.npmjs.com/package/nuxt/v/rc"><img alt="size" src="https://img.shields.io/github/package-json/dependency-version/kuizuo/api-service/dev/nuxt?style=flat&colorA=002438&colorB=28CF8D"></a>
  <a href="https://github.com/kuizuo/api-service/actions/workflows/ci.yml"><img alt="CI" src="https://img.shields.io/github/workflow/status/kuizuo/api-service/ci?label=ci&logo=github"></a>
  <a href="https://github.com/kuizuo/api-service/tree/HEAD/LICENSE"><img alt="License" src="https://img.shields.io/github/license/kuizuo/api-service?style=flat&colorA=002438&colorB=28CF8D" /></a>
</p>

## Preview

![API-Service](https://img.kuizuo.cn/KZ%20API.png)

## Features

- [x] 接口文档
- [x] 接口限流
- [x] 接口缓存
- [x] 接口测试
- [x] 接口计次
- [ ] 接口监控

## Usage

```
git clone https://github.com/kuizuo/api-service
cd api-service
pnpm i
```

### Development

```
pnpm dev
```

### Build

```
pnpm build
```

### Cloudflare Workers

推荐部署到 Cloudflare Workers。项目已经包含 `wrangler.jsonc`，默认绑定域名为 `api.kuizuo.me`，并使用 Cloudflare KV 保存接口调用次数和服务端缓存。

首次部署前先登录并确认账号：

```shell
pnpm wrangler whoami
```

如果需要重新创建 KV 命名空间：

```shell
pnpm wrangler kv namespace create api-service-prod
```

创建后把输出里的 `id` 填到 `wrangler.jsonc` 的 `kv_namespaces[0].id`。

本地生成 Cloudflare Workers 产物：

```shell
pnpm build:cloudflare
```

本地预览 Cloudflare Workers 版本：

```shell
pnpm preview:cloudflare
```

部署到 Cloudflare Workers：

```shell
pnpm deploy:cloudflare
```

当前配置会把 Worker 绑定到 `api.kuizuo.me`。如果域名不在当前 Cloudflare 账号下，需要先把 `kuizuo.me` 添加到 Cloudflare，再部署。

## Develop

### Server

这里使用 pm2 进行部署，配置文件 `ecosystem.config.js` 如下：

```js
module.exports = {
  apps: [
    {
      name: 'API-Service',
      exec_mode: 'cluster',
      instances: '1',
      PORT: 8040,
      env: {
        NUXT_PUBLIC_API_URL: 'https://api.kuizuo.me',
      },
      script: './.output/server/index.mjs',
    },
  ],
}
```

执行 `pm2 start ecosystem.config.js` 启动服务。

### Docker

```shell
docker buildx build . -t api-service:latest
```

### Vercel

转到 [Vercel](https://vercel.com/new) 并选择你的项目，点击  "Deploy"，您的应用程序将在一分钟内上线。

### Netlify

转到 [Netlify](https://app.netlify.com/start) 并选择您的项目，点击 "Deploy site"，您的应用程序将在一分钟内上线。

## Why

我个人经常与 API 接口打交道，因而收集了些常用的 api。但这些 api 接口调用方式各不相同，所以编写这个项目为了将这些接口整合到一起，进行易用性的封装，使其更易调用。

**API 接口均来自网络，如有侵权，请联系作者删除！**

## License

[MIT](https://github.com/kuizuo/api-service/blob/main/LICENSE)
