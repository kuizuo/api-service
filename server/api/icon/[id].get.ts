export default defineEventHandler(async (event) => {
  event.context.cache = { ttl: TimeUnit.day }
  const id = event.context.params!.id as string

  const icon = id.includes('.') ? id : `${id}.svg`

  const response = await fetch(`https://api.iconify.design/${icon}`)

  if (!response.ok)
    throw createError({ statusCode: 404, message: 'Icon Not Found' })

  const arrayBuffer = await response.arrayBuffer()
  event.node.res.setHeader('Content-Type', 'image/svg+xml;charset=utf-8')
  return Buffer.from(arrayBuffer)
})
