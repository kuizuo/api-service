export function Url(path = '') {
  const baseUrl = process.env.NUXT_PUBLIC_API_URL

  return new URL(path, baseUrl)
}
