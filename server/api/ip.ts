import { TimeUnitMap } from '~~/utils/time'

export default defineEventHandler(async (event) => {
  event.context.cache = { ttl: TimeUnitMap.hour }

  const data = await (await fetch('http://whois.pconline.com.cn/ipJson.jsp?ip=&json=true')).json()
  return data.ip
})
