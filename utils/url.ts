const { public: { apiUrl } } = useRuntimeConfig()

export function Url(path = '') {
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8040' : apiUrl

  return new URL(path, baseUrl)
}
