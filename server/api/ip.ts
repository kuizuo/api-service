import { getIP } from '~~/utils'

export default defineEventHandler(async (event) => {
  const ip = getIP(event.req)

  return ip
})
