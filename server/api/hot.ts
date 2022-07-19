export default defineEventHandler(async () => {
  const data = await (await fetch('https://open.tophub.today/hot')).json()
  return data?.data
})
