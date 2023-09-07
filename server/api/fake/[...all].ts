export default defineEventHandler(async (event) => {
  event.context.cache = { ttl: TimeUnit.second * 3 }

  const params = event.context.params
  const data = await (await fetch(`https://jsonplaceholder.typicode.com/${params.all ?? ''}`)).json()

  return data
})
