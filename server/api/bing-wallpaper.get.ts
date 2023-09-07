import { TimeUnitMap, getTodayRemainMillisecond } from '~~/utils/time'

interface Query {
  region?: 'zh-CN' | 'en-US' | 'ja-JP' | 'en-AU' | 'en-UK' | 'de-DE' | 'en-NZ' | 'en-CA'
}

export default defineEventHandler(async (event) => {
  const { type = 'img', region = 'zh-CN' } = getQuery<Query>(event)

  if (type === 'img') {
    const cache = await useStorage('cache').getItem('bing-wallpaper')
    if (cache)
      return await sendRedirect(event, cache, 302)
  }

  // https://github.com/zkeq/Bing-Wallpaper-Action
  const data = await (await fetch(`https://raw.onmicrosoft.cn/Bing-Wallpaper-Action/main/data/${region}_all.json`)).json()

  if (type === 'img') {
    const url = `https://bing.com${data.data[0].url}`
    useStorage('cache').setItem('cache:bing-wallpaper', url, { ttl: getTodayRemainMillisecond() })

    return await sendRedirect(event, url, 302)

    // event.node.res.setHeader('Content-Type', 'image/png;charset=utf-8')
    // return Buffer.from(await (await fetch(url)).arrayBuffer())
  }
  else {
    event.context.cache = { ttl: TimeUnitMap.hour }
    return data
  }
})
