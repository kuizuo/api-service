import type { H3Event } from 'h3'
import { getRequestHeader } from 'h3'

export async function getImgMine(buffer: Buffer | Uint8Array) {
  return detectImageMime(buffer) ?? 'image/svg+xml'
}

export async function getImgContentType(buffer: Buffer | Uint8Array) {
  const mime = detectImageMime(buffer) ?? 'image/svg+xml'

  return `${mime};charset=utf-8`
}

function detectImageMime(buffer: Buffer | Uint8Array) {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer)
  const ascii = (start: number, end: number) => String.fromCharCode(...bytes.slice(start, end))

  if (bytes.length >= 8
    && bytes[0] === 0x89
    && bytes[1] === 0x50
    && bytes[2] === 0x4E
    && bytes[3] === 0x47
    && bytes[4] === 0x0D
    && bytes[5] === 0x0A
    && bytes[6] === 0x1A
    && bytes[7] === 0x0A)
    return 'image/png'

  if (bytes.length >= 3 && bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF)
    return 'image/jpeg'

  if (bytes.length >= 6 && (ascii(0, 6) === 'GIF87a' || ascii(0, 6) === 'GIF89a'))
    return 'image/gif'

  if (bytes.length >= 12 && ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP')
    return 'image/webp'

  if (bytes.length >= 4 && bytes[0] === 0x00 && bytes[1] === 0x00 && bytes[2] === 0x01 && bytes[3] === 0x00)
    return 'image/x-icon'

  const head = ascii(0, Math.min(bytes.length, 256)).trimStart()
  if (head.startsWith('<svg') || head.startsWith('<?xml'))
    return 'image/svg+xml'
}

export function getIP(event: H3Event) {
  const forwardedFor = getRequestHeader(event, 'x-forwarded-for')

  return (
    getRequestHeader(event, 'cf-connecting-ip')
    || forwardedFor?.split(',')[0]?.trim()
    || event.node.req.socket?.remoteAddress
    || ''
  ).replace('::ffff:', '')
}

export function getUrlId(url: string) {
  return url?.match(/^\/api\/([^/?\s]+)/)?.[1] ?? ''
}
