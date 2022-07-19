import type { ServerResponse } from 'h3'
import { defaultContentType } from 'h3'
import LRU from 'lru-cache'
import { TimeUnitMap } from '~~/utils/time'

const options = {
  max: 500,
  ttl: TimeUnitMap.minute * 3, // 缓存3min
  allowStale: false,
  updateAgeOnGet: false,
  updateAgeOnHas: false,
  // dispose: (value, key) => {
  //   freeFromMemoryOrWhatever(value)
  // },
}
const cache = new LRU(options)

export default defineEventHandler(async (event) => {
  defaultContentType(event, 'text/plain; charset=utf-8')

  const { req, res, context } = event
  if (/^\/api\/[A-Za-z0-9].*/.test(req.url || '')) {
    const key = req.url
    const cached = cache.get(key)
    if (cached)
      return res.end(cached)

    const original_res_end = res.end
    res.end = function (...args: any): ServerResponse {
      // 这里的args就是 res.end 调用的参数

      const data = args?.[0]
      if (data) {
        if (context.cache) {
          if (!context.cache.disable) {
            const options = context.cache
            cache.set(key, data, options)
          }
        }
        else {
          cache.set(key, data)
        }
      }

      // 最后可别忘了调用原始的 res.end，不然客户端一直处于等待状态
      return original_res_end.apply(this, args)
    }
  }
})
