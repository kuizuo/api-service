export default defineEventHandler(async (event) => {
  const { qq } = useQuery(event)

  if (!qq)
    throw createError({ statusCode: 400, message: 'qq is required' })

  try {
    const arrayBuffer = await (await fetch(`https://r.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins=${qq}`)).arrayBuffer()
    const text = new TextDecoder('gbk').decode(arrayBuffer)
    const nick = JSON.parse(text.match(/\(({.*?})\)/)![1])[qq as string]?.[6]
    event.res.setHeader('Content-Type', 'text/html;charset=utf-8')
    return nick
  }
  catch (error) {
    // TODO: 接口出错 则上报错误信息
    console.error(error)
    return error
  }
})
