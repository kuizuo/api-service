import { getCityCode } from '~~/utils/city'
import { TimeUnitMap } from '~~/utils/time'

interface Query {
  city: string
}

export default defineEventHandler(async (event) => {
  event.context.cache = { ttl: TimeUnitMap.hour }

  const { city = '' } = useQuery<Query>(event)

  const id = getCityCode(city)

  // http://api.help.bj.cn/
  const data = await (await fetch(`https://api.help.bj.cn/apis/weather/?id=${id}`)).json()

  return data
})
