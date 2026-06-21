export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname

  if (/^\/api\/[A-Za-z0-9].*/.test(path)) {
    const id = getUrlId(path)

    if (id !== 'count') {
      const key = `log:${id}`
      const count = Number(await useStorage('db').getItem(key) ?? 0)

      await useStorage('db').setItem(key, count + 1)
    }
  }
})
