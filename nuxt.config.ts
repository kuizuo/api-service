export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
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
  tailwindcss: {
    exposeConfig: true,
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
