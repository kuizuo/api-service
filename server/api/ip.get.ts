export default defineEventHandler(async (event) => {
  const ip = getIP(event)

  return ip
})
