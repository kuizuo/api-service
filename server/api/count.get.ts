export default defineEventHandler(async (event) => {
  const { id } = getQuery<{ id: string }>(event)

  if (id)
    return Number(await useStorage('db').getItem(`log:${id}`) ?? 0)

  const keys = await useStorage('db').getKeys('log')

  const result = await Promise.all(keys.map(async (key: any) => {
    const count = Number(await useStorage('db').getItem(key) ?? 0)
    const id = key.replace('log:', '')
    return { id, count }
  }))
  return result
})
