import { defaultContentType } from 'h3'

export default defineEventHandler((event) => {
  if (/^\/api\/[A-Za-z0-9].*/.test(getRequestURL(event).pathname))
    defaultContentType(event, 'text/plain; charset=utf-8')
})
