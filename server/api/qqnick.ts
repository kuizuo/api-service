import { gbkDecode } from '~~/utils/encoding'

export default defineEventHandler(async (event) => {
  const { qq } = useQuery(event)

  if (!qq)
    throw createError({ statusCode: 400, message: 'qq is required' })

  try {
    const arrayBuffer = await (await fetch(`https://r.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins=${qq}`)).arrayBuffer()
    const data = gbkDecode(arrayBuffer)
    const nick = JSON.parse(data.match(/\(({.*?})\)/)![1])[qq as string]?.[6]
    event.res.setHeader('Content-Type', 'text/html;charset=utf-8')
    return nick
  }
  catch (error) {
    return error
  }
})
