import { getIP } from '~~/utils'
import { gbkDecode } from '~~/utils/encoding'
import { TimeUnitMap } from '~~/utils/time'

interface Query {
  ip: string
}

export default defineEventHandler(async (event) => {
  event.context.cache = { ttl: TimeUnitMap.hour }

  // eslint-disable-next-line prefer-const
  let { ip, type = 'text' } = useQuery<Query>(event)

  if (!ip)
    ip = getIP(event.req)

  const arrayBuffer = await (await fetch(`http://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`)).arrayBuffer()
  const data = JSON.parse(gbkDecode(arrayBuffer))

  if (type === 'text')
    return data.addr
  else
    return data
})

