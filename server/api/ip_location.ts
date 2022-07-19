import { gbkDecode } from '~~/utils/encoding'

export default defineEventHandler(async (event) => {
  const { ip = '', type = 'text' } = useQuery(event)

  const arrayBuffer = await (await fetch(`http://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`)).arrayBuffer()
  const data = gbkDecode(arrayBuffer)
  if (type === 'text')
    return JSON.parse(data).addr
  else
    return JSON.parse(data)
})
