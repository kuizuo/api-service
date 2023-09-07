import { TimeUnitMap } from '~~/utils/time'

export default defineEventHandler(async (event) => {
  event.context.cache = { ttl: TimeUnitMap.day }
  let { id } = event.context.params

  if (!id.includes('.'))
    id = `${id}.svg`

  const response = await fetch(`https://api.iconify.design/${id}`)

  if (!response.ok)
    throw createError({ statusCode: 404, message: 'Icon Not Found' })

  const arrayBuffer = await response.arrayBuffer()
  event.node.res.setHeader('Content-Type', 'image/svg+xml;charset=utf-8')
  return Buffer.from(arrayBuffer)
})
