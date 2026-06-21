export default defineEventHandler(async (event) => {
  const { website, type = 'text' } = getQuery(event)

  if (!website)
    throw createError({ statusCode: 400, message: '网站不能为空' })

  if (!isExternal(website))
    throw createError({ statusCode: 400, message: '网站格式错误' })

  const { origin } = new URL(website)
  const html = await (await fetch(origin)).text()
  let href = findIconHref(html)

  if (href)
    href = !isExternal(href) ? new URL(href, origin).href : href

  else href = new URL('favicon.ico', origin).href

  if (type === 'img') {
    setResponseHeader(event, 'Content-Type', 'image/x-icon')
    setResponseHeader(event, 'Cache-Control', 'public, max-age=3600')
    return new Uint8Array(await (await fetch(href)).arrayBuffer())
  }
  else {
    setResponseHeader(event, 'Cache-Control', 'public, max-age=3600')
    return href
  }
})

function findIconHref(html: string) {
  const linkTags = html.match(/<link\b[^>]*>/gi) ?? []

  for (const tag of linkTags) {
    const rel = getAttribute(tag, 'rel')
    if (!rel?.toLowerCase().includes('icon'))
      continue

    const href = getAttribute(tag, 'href')
    if (href)
      return href
  }
}

function getAttribute(tag: string, name: string) {
  const pattern = new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i')
  const match = tag.match(pattern)

  return match?.[1] ?? match?.[2] ?? match?.[3]
}
