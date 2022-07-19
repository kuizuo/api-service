import type{ IncomingMessage } from 'h3'
import { RLWrapperBlackAndWhite, RateLimiterMemory } from 'rate-limiter-flexible'

const rateLimiter = new RLWrapperBlackAndWhite({
  limiter: new RateLimiterMemory({
    points: 1,
    duration: 1,
  }),
})

function getIP(req: IncomingMessage) {
  return ((req.headers['x-forwarded-for'] as string) || req.socket?.remoteAddress as string).replace('::ffff:', '')
}

export default defineEventHandler(async (event) => {
  const { req, res } = event

  if (/^\/api\/[A-Za-z0-9].*/.test(req.url || '')) {
    const ip = getIP(req)

    try {
      await rateLimiter.consume(ip)
    }
    catch (error) {
      res.statusCode = 429
      return { statusCode: 429, statusMessage: '请求太快了,请稍后再试' }
    }
  }
})

