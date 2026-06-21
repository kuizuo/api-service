export default defineCachedEventHandler(async (event) => {
  const params = event.context.params
  const data = await (await fetch(`https://jsonplaceholder.typicode.com/${params.all ?? ''}`)).json()

  return data
}, {
  maxAge: TimeUnit.second * 3 / 1000,
})
