module.exports = {
  apps: [
    {
      name: 'API-Service',
      exec_mode: 'cluster',
      instances: '1',
      PORT: 8040,
      env: {
        NUXT_PUBLIC_API_URL: 'https://api.kuizuo.cn',
      },
      script: './.output/server/index.mjs',
    },
  ],
}
