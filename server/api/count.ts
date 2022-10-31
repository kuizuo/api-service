import { TimeUnitMap } from '~~/utils/time'

export default defineEventHandler(async (event) => {
  event.context.cache = { ttl: TimeUnitMap.minute }

  const { id } = useQuery<{ id: string }>(event)

  if (id)
    return await useStorage().getItem(`redis:log:${id}`)

  const keys = await useStorage().getKeys('redis:log')

  const result = await Promise.all(keys.map(async (key: any) => {
    const count = await useStorage().getItem(key)
    const id = key.replace('redis:log:', '')
    return { id, count }
  }))
  return result
})
