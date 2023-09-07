export default defineNuxtConfig({
  app: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
    },
  },
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxtjs/color-mode',
  ],
  content: {
    documentDriven: false,
    markdown: {
      mdc: true,
    },
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
    dataValue: 'theme',
  },
  css: [
    '~/assets/css/main.css',
  ],
  experimental: {
    inlineSSRStyles: false,
  },
  typescript: {
    includeWorkspace: true,
  },
  nitro: {
    storage: {
      db: {
        driver: 'redis',
      },
      cache: {
        driver: 'redis',
      },
    },
    devStorage: {
      db: {
        driver: 'fs',
        base: './data/db',
      },
    },
  },
})
