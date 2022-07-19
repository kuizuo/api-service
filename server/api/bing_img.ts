export default defineEventHandler(async () => {
  const arrayBuffer = await (await fetch('https://bing.ioliu.cn/v1')).arrayBuffer()
  return Buffer.from(arrayBuffer)
})
