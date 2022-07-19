import { TimeUnitMap } from '~~/utils/time'

export default defineEventHandler(async (event) => {
  event.context.cache = { ttl: TimeUnitMap.second * 5 }

  const { width = 200, height = 200 } = useQuery(event)

  const arrayBuffer = await (await fetch(`https://picsum.photos/${width}/${height}`)).arrayBuffer()
  return Buffer.from(arrayBuffer)
})
