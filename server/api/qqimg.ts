export default defineEventHandler(async (event) => {
  const { qq } = useQuery(event)

  if (!qq)
    throw createError({ statusCode: 400, message: 'QQ不能为空' })

  const arrayBuffer = await (await fetch(`https://q4.qlogo.cn/g?b=qq&nk=${qq}&s=100`)).arrayBuffer()
  return Buffer.from(arrayBuffer)
})
