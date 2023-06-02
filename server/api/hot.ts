export default defineCachedEventHandler(async () => {
  const data = await (await fetch('https://open.tophub.today/hot')).json()
  return data?.data
}, {
  maxAge: 5,
})
