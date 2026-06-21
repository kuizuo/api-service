export default defineCachedEventHandler(async (event) => {
  const id = event.context.params!.id as string

  const icon = id.includes('.') ? id : `${id}.svg`

  const response = await fetch(`https://api.iconify.design/${icon}`)

  if (!response.ok)
    throw createError({ statusCode: 404, message: 'Icon Not Found' })

  setResponseHeader(event, 'Content-Type', 'image/svg+xml;charset=utf-8')
  return response.text()
}, {
  maxAge: TimeUnit.day / 1000,
})
