export default defineEventHandler(async (event) => {
  const { width = 200, height = 200 } = useQuery(event)

  const arrayBuffer = await (await fetch(`https://picsum.photos/${width}/${height}`)).arrayBuffer()
  return Buffer.from(arrayBuffer)
})
