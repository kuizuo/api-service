export default defineEventHandler(async (event) => {
  const { qq } = useQuery(event)

  if (!qq)
    throw createError({ statusCode: 400, message: 'qq is required' })

  try {
    const img = await (await fetch(`https://q4.qlogo.cn/g?b=qq&nk=${qq}&s=100`)).arrayBuffer()
    return Buffer.from(img)
  }
  catch (error) {
    // TODO: 接口出错 则上报错误信息
    console.error(error)
    return error
  }
})
