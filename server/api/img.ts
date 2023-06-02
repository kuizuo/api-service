import { TimeUnitMap } from '~~/utils/time'

export default defineEventHandler(async (event) => {
  event.context.cache = { ttl: TimeUnitMap.second * 5 }

  const { width = 200, height = 200 } = getQuery(event)

  const arrayBuffer = await (await fetch(`https://picsum.photos/${width}/${height}`)).arrayBuffer()
  event.node.res.setHeader('Content-Type', 'image;charset=utf-8')
  return Buffer.from(arrayBuffer)
})
