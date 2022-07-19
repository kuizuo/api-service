import { getTodayRemainMillisecond } from '~~/utils/time'

export default defineEventHandler(async (event) => {
  event.context.cache = { ttl: getTodayRemainMillisecond() }

  const arrayBuffer = await (await fetch('https://bing.ioliu.cn/v1')).arrayBuffer()
  return Buffer.from(arrayBuffer)
})
