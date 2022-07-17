/* result
{
  "ip": "123.123.123.123",
  "pro": "北京市",
  "proCode": "110000",
  "city": "北京市",
  "cityCode": "110000",
  "region": "顺义区",
  "regionCode": "110113",
  "addr": "北京市顺义区 联通",
  "regionNames": "",
  "err": ""
}
*/

import { gbkDecode } from '~~/utils/encoding'

export default defineEventHandler(async (event) => {
  const { ip, json = false } = useQuery(event)

  if (!ip)
    throw createError({ statusCode: 400, message: 'ip is required' })

  try {
    const arrayBuffer = await (await fetch(`http://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`)).arrayBuffer()
    const data = gbkDecode(arrayBuffer)
    if (json) {
      return JSON.parse(data)
    }
    else {
      event.res.setHeader('Content-Type', 'text/html;charset=utf-8')
      return JSON.parse(data).addr
    }
  }
  catch (error) {
    // TODO: 接口出错 则上报错误信息
    console.error(error)
    return error
  }
})
