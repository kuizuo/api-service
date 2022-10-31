import { getUrlId } from '~~/utils'

export default defineEventHandler(async (event) => {
  const { req } = event

  if (/^\/api\/[A-Za-z0-9].*/.test(req.url || '')) {
    const id = getUrlId(req.url!)

    if (id !== 'count') {
      const key = `redis:log:${id}`
      let count = await useStorage().getItem(key)

      useStorage().setItem(key, ++count)
    }
  }
})

