import { gbkDecode } from '~~/utils/encoding'

export default defineEventHandler(async (event) => {
  const { qq } = useQuery(event)

  if (!qq)
    throw createError({ statusCode: 400, message: 'QQ不能为空' })

  const arrayBuffer = await (await fetch(`https://r.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins=${qq}`)).arrayBuffer()
  const data = gbkDecode(arrayBuffer)
  const nick = JSON.parse(data.match(/\(({.*?})\)/)![1])[qq]?.[6]

  return nick
})
