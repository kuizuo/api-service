export function Url(path = '') {
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8040' : process.env.NUXT_PUBLIC_API_URL

  return new URL(path, baseUrl)
}
