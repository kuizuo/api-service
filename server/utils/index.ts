import type { NodeIncomingMessage } from 'h3'
import imageType from 'image-type'

export async function getImgMine(buffer: Buffer | Uint8Array) {
  const imgType = await imageType(buffer)
  if (imgType)
    return imgType?.mime ?? ''

  return 'image/svg+xml'
}

export async function getImgContentType(buffer: Buffer | Uint8Array) {
  const imgType = await imageType(buffer)
  if (imgType)
    return `${imgType?.mime};charset=utf-8` ?? 'image;charset=utf-8'

  return 'image/svg+xml;charset=utf-8'
}

export function getIP(req: NodeIncomingMessage) {
  return ((req.headers['x-forwarded-for'] as string) || req.socket?.remoteAddress as string)?.replace('::ffff:', '')
}

export function getUrlId(url: string) {
  return url?.match(/^\/api\/(.*?)[/?\s]/)?.[1] ?? ''
}
