import { TimeUnitMap } from '~~/utils/time'

interface Query {
  qq: string
}

export default defineEventHandler(async (event) => {
  event.context.cache = { ttl: TimeUnitMap.second * 5 }

  const { qq } = getQuery<Query>(event)

  if (!qq)
    throw createError({ statusCode: 400, message: 'QQ不能为空' })

  const arrayBuffer = await (await fetch(`https://q4.qlogo.cn/g?b=qq&nk=${qq}&s=100`)).arrayBuffer()

  event.node.res.setHeader('Content-Type', 'image;charset=utf-8')
  return Buffer.from(arrayBuffer)
})
