export default defineEventHandler(async () => {
  const data = await (await fetch('http://whois.pconline.com.cn/ipJson.jsp?ip=&json=true')).json()
  return data.ip
})
