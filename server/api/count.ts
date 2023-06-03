export default defineCachedEventHandler(async (event) => {
  const { id } = getQuery<{ id: string }>(event)

  if (id)
    return await useStorage('db').getItem(`log:${id}`)

  const keys = await useStorage('db').getKeys('log')

  const result = await Promise.all(keys.map(async (key: any) => {
    const count = await useStorage('db').getItem(key)
    const id = key.replace('log:', '')
    return { id, count }
  }))
  return result
}, {
  maxAge: 60,
})
