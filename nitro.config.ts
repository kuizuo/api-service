import { defineNitroConfig } from 'nitropack'

export default defineNitroConfig({
  storage: {
    redis: {
      driver: 'redis',

    },
  },
})
