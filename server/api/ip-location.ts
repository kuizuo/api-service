import { getIP } from '~~/utils'
import { gbkDecode } from '~~/utils/encoding'

interface Query {
  ip: string
}

export default defineCachedEventHandler(async (event) => {
  // eslint-disable-next-line prefer-const
  let { ip, type = 'text' } = getQuery<Query>(event)

  if (!ip)
    ip = getIP(event.node.req)

  const arrayBuffer = await (await fetch(`http://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`)).arrayBuffer()
  const data = JSON.parse(gbkDecode(arrayBuffer))

  if (type === 'text')
    return data.addr
  else
    return data
}, {
  maxAge: 10 * 60,
})

