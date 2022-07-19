import { TimeUnitMap } from '~~/utils/time'

export default defineEventHandler(async (event) => {
  event.context.cache = { ttl: TimeUnitMap.minute * 10 }

  const data = await (await fetch('https://open.tophub.today/hot')).json()
  return data?.data
})
