import { RLWrapperBlackAndWhite, RateLimiterMemory } from 'rate-limiter-flexible'

const whiteList = ['count']

const rateLimiter = new RLWrapperBlackAndWhite({
  limiter: new RateLimiterMemory({
    points: 5,
    duration: 2,
  }),
})

export default defineEventHandler(async (event) => {
  const { node: { req, res } } = event

  if (whiteList.includes(getUrlId(req.url!))) {
    // Skip
  }
  else if (/^\/api\/[A-Za-z0-9].*/.test(req.url || '')) {
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
