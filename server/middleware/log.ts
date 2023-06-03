import { getUrlId } from '~~/utils'

export default defineEventHandler(async (event) => {
  const { req } = event

  if (/^\/api\/[A-Za-z0-9].*/.test(req.url || '')) {
    const id = getUrlId(req.url!)

    if (id !== 'count') {
      const key = `log:${id}`
      let count = await useStorage('db').getItem(key) as unknown as number

      useStorage('db').setItem(key, ++count)
    }
  }
})

