import { TimeUnitMap } from '~~/utils/time'

export default defineEventHandler(async (event) => {
  event.context.cache = { ttl: TimeUnitMap.second * 5 }

  const { type = 'text' } = useQuery(event)
  const data = await (await fetch('https://v1.hitokoto.cn/')).json()
  if (type === 'text')
    return data.hitokoto
  else
    return data
})
