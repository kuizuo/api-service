import { create } from 'qrcode/lib/core/qrcode.js'
import { render } from 'qrcode/lib/renderer/svg-tag.js'

interface Query {
  text: string
}

export default defineCachedEventHandler(async (event) => {
  const { text, type = 'img' } = getQuery<Query>(event)

  if (!text)
    throw createError({ statusCode: 400, message: '文本不能为空' })

  const svg = render(create(text))

  if (type === 'img') {
    setResponseHeader(event, 'Content-Type', 'image/svg+xml;charset=utf-8')
    return svg
  }

  return `data:image/svg+xml;base64,${btoa(svg)}`
}, {
  maxAge: TimeUnit.hour / 1000,
})
