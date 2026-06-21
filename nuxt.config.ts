const isCloudflare = process.env.NITRO_PRESET?.startsWith('cloudflare')

export default defineNuxtConfig({
  compatibilityDate: '2026-06-21',
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'https://api.kuizuo.me',
    },
  },
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/content',
    '@nuxt/ui',
  ],
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
        sepia: 'monokai',
      },
    },
  },
  tailwindcss: {
    exposeConfig: true,
    config: {
      content: [
        'content/**/**.md',
      ],
    },
  },
  ui: {
    icons: ['mdi', 'carbon'],
  },
  colorMode: {
    classSuffix: '',
  },
  css: [
    '~/assets/css/main.css',
  ],
  nitro: {
    storage: {
      db: isCloudflare
        ? {
            driver: 'cloudflare-kv-binding',
            binding: 'API_SERVICE_KV',
          }
        : process.env.REDIS_HOST
          ? {
              driver: 'redis',
              host: process.env.REDIS_HOST,
              user: process.env.REDIS_USER,
              password: process.env.REDIS_PASSWORD,
            }
          : {
              driver: 'memory',
            },
      cache: isCloudflare
        ? {
            driver: 'cloudflare-kv-binding',
            binding: 'API_SERVICE_KV',
            base: 'cache',
          }
        : {
            driver: 'memory',
          },
    },
  },
  experimental: {
    typedPages: true,
    asyncContext: true,
  },
  devtools: { enabled: true },
})
