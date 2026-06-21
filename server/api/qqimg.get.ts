interface Query {
  qq: string
}

export default defineEventHandler(async (event) => {
  const { qq } = getQuery<Query>(event)

  if (!qq)
    throw createError({ statusCode: 400, message: 'QQ不能为空' })

  const arrayBuffer = await (await fetch(`https://q4.qlogo.cn/g?b=qq&nk=${qq}&s=100`)).arrayBuffer()

  setResponseHeader(event, 'Content-Type', 'image;charset=utf-8')
  setResponseHeader(event, 'Cache-Control', 'public, max-age=5')
  return new Uint8Array(arrayBuffer)
})
