import { gbkDecode } from '~~/utils/encoding'
import { TimeUnitMap } from '~~/utils/time'

export default defineEventHandler(async (event) => {
  event.context.cache = { ttl: TimeUnitMap.hour }

  const { ip = '', type = 'text' } = useQuery(event)

  const arrayBuffer = await (await fetch(`http://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`)).arrayBuffer()
  const data = gbkDecode(arrayBuffer)
  if (type === 'text')
    return JSON.parse(data).addr
  else
    return JSON.parse(data)
})
