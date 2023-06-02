import { defaultContentType } from 'h3'
import type { NodeServerResponse } from 'h3'

import LRU from 'lru-cache'
import { getImgMine } from '~~/utils'
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

  const { node: { req, res }, context } = event
  if (/^\/api\/[A-Za-z0-9].*/.test(req.url || '')) {
    const key = req.url
    const cached = cache.get(key)
    if (cached) {
      if (Buffer.isBuffer(cached)) {
        const contentType = `${await getImgMine(cached)};charset=utf-8`
        res.setHeader('Content-Type', contentType)

        return Buffer.from(cached)
      }

      return cached
    }

    const original_res_end = res.end
    res.end = function (...args: any): NodeServerResponse {
      // 这里的args就是 res.end 调用的参数

      const data = args?.[0]
      if (data && context.cache) {
        const options = context.cache
        cache.set(key, data, options)
      }

      // 最后可别忘了调用原始的 res.end，不然客户端一直处于等待状态
      return original_res_end.apply(this, args)
    }
  }
})
