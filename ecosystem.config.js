module.exports = {
  apps: [
    {
      name: 'API-Service',
      script: './.output/server/index.mjs',
      exec_mode: 'cluster',
      instances: '1',
      port: 8040,
      env: {
        NODE_ENV: 'production',
        NUXT_PUBLIC_API_URL: 'https://api.kuizuo.cn',
        REDIS_HOST: '124.221.59.33',
        REDIS_USER: 'default',
        REDIS_PASSWORD: 'Aa123456',
      },
    },
  ],
}
