export default defineEventHandler(async (event) => {
  const { type = 'img' } = useQuery(event)

  const data = await (await fetch('https://api.thecatapi.com/v1/images/search?limit=1')).json()

  if (type === 'json') { return data[0] }

  else {
    const headers = { 'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36' }
    const arrayBuffer = await (await fetch(data[0].url, { headers })).arrayBuffer()
    return Buffer.from(arrayBuffer)
  }
})
