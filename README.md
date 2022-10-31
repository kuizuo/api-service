<p align="center">
  <img src="https://api.iconify.design/carbon:api-1.svg" width="50" height="50" />
</p>
<p align="center">
  <i>Artwork from <a href="https://v3.nuxtjs.org/">Nuxt3</a></i>
</p>
<pre align="center">
🧪 整理稳定、快速、好用的 API 接口
</pre>

<p align="center">
<br>
<a href="https://api.kuizuo.cn">🖥 Online Preview</a>
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

![KZ API](https://img.kuizuo.cn/KZ%20API.png)

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


## Develop

### Server

这里使用 pm2 进行部署，在 `.output` 同级目录下创建 `ecosystem.config.js` 文件：

```js
module.exports = {
  apps: [
    {
      name: 'KZ_API',
      exec_mode: 'cluster',
      instances: '1',
      env: {
        NITRO_PORT: 8040,
        NITRO_HOST: '127.0.0.1',
        NODE_ENV: 'production',
      },
      script: './.output/server/index.mjs',
    },
  ],
}
```

接着执行 `pm2 start ecosystem.config.js` 即可。

### Vercel

转到 [Vercel](https://vercel.com/new) 并选择你的项目，点击  "Deploy"，您的应用程序将在一分钟内上线。

### Netlify

转到 [Netlify](https://app.netlify.com/start) 并选择您的项目，点击 "Deploy site"，您的应用程序将在一分钟内上线。

## Why

我个人经常与 API 接口打交道，因而收集了些常用的 api。但这些 api 接口调用方式各不相同，所以编写这个项目为了将这些接口整合到一起，进行易用性的封装，使其更易调用。

**API 接口均来自网络，如有侵权，请联系作者删除！**

## License

[MIT](https://github.com/kuizuo/api-service/blob/main/LICENSE)
