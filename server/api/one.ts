import { TimeUnitMap } from '~~/utils/time'

export default defineEventHandler(async (event) => {
  event.context.cache = { ttl: TimeUnitMap.second * 3 }

  const { type = 'text' } = getQuery(event)
  const data = await (await fetch('https://v1.hitokoto.cn/')).json()
  if (type === 'text')
    return data.hitokoto
  else
    return data
})
