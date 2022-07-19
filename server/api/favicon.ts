import { load } from 'cheerio'
import { isExternal } from '~~/utils/is'

export default defineEventHandler(async (event) => {
  const { website, type = 'text' } = useQuery(event)

  if (!website)
    throw createError({ statusCode: 400, message: '网站不能为空' })

  if (!isExternal(website))
    throw createError({ statusCode: 400, message: '网站格式错误' })

  const { origin } = new URL(website)
  const html = await (await fetch(origin)).text()
  const $ = load(html)
  let href = $('link[rel*="icon"]').attr('href')

  if (href)
    href = !isExternal(href) ? new URL(href, origin).href : href

  else href = new URL('favicon.ico', origin).href

  if (type === 'img') {
    event.res.setHeader('Content-Type', 'image/x-icon')
    return Buffer.from(await (await fetch(href)).arrayBuffer())
  }
  else {
    return href
  }
})
