export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
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
      db: {
        driver: 'redis',
        host: process.env.REDIS_HOST,
        user: process.env.REDIS_USER,
        password: process.env.REDIS_PASSWORD,
      },
    },
  },
  experimental: {
    typedPages: true,
    asyncContext: true,
  },
  devtools: { enabled: true },
})
