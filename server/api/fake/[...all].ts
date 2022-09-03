import { TimeUnitMap } from '~~/utils/time'

export default defineEventHandler(async (event) => {
  event.context.cache = { ttl: TimeUnitMap.second }

  const params = event.context.params
  const { type = 'text' } = useQuery(event)
  const data = await (await fetch(`https://jsonplaceholder.typicode.com/${params.all ?? ''}`)).json()

  if (type === 'text')
    return data
  else
    return data
})
