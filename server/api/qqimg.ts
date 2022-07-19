import { TimeUnitMap } from '~~/utils/time'

export default defineEventHandler(async (event) => {
  event.context.cache = { ttl: TimeUnitMap.hour }

  const { qq } = useQuery(event)

  if (!qq)
    throw createError({ statusCode: 400, message: 'QQ不能为空' })

  const arrayBuffer = await (await fetch(`https://q4.qlogo.cn/g?b=qq&nk=${qq}&s=100`)).arrayBuffer()
  return Buffer.from(arrayBuffer)
})
