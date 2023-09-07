export default defineCachedEventHandler(async (event) => {
  const { type = 'text' } = getQuery(event)
  const data = await (await fetch('https://v1.hitokoto.cn/')).json()
  if (type === 'text')
    return data.hitokoto
  else
    return data
}, {
  maxAge: 3,
})
