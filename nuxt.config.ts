export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxt/content',
    '@nuxthq/ui',
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
  unocss: {
    preflight: true,
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
