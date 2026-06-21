export default defineEventHandler(async (event) => {
  const { width = 200, height = 200 } = getQuery(event)

  const arrayBuffer = await (await fetch(`https://picsum.photos/${width}/${height}`)).arrayBuffer()
  setResponseHeader(event, 'Content-Type', 'image;charset=utf-8')
  setResponseHeader(event, 'Cache-Control', 'public, max-age=5')
  return new Uint8Array(arrayBuffer)
})
