import type{ IncomingMessage } from 'h3'
import { RLWrapperBlackAndWhite, RateLimiterMemory } from 'rate-limiter-flexible'

const rateLimiter = new RLWrapperBlackAndWhite({
  limiter: new RateLimiterMemory({
    points: 1,
    duration: 1,
  }),
  whiteList: [],
  isWhiteListed(ip) {
    return /(^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.)/.test(ip)
  },
})

function getIP(req: IncomingMessage) {
  return ((req.headers['x-forwarded-for'] as string) || req.socket?.remoteAddress as string).replace('::ffff:', '')
}

export default defineEventHandler(async (event) => {
  const { req, res } = event

  const ip = getIP(req)
  try {
    await rateLimiter.consume(ip)

    // TODO: 接口计次
  }
  catch (error) {
    res.statusCode = 429
    return { statusCode: 429, statusMessage: '请求太快了,请稍后再试' }
  }
})

