import { getCityCode } from '~~/utils/city'

interface Query {
  city: string
}

export default defineCachedEventHandler(async (event) => {
  const { city = '' } = getQuery<Query>(event)

  const id = getCityCode(city)

  // http://api.help.bj.cn/
  const data = await (await fetch(`https://api.help.bj.cn/apis/weather/?id=${id}`)).json()

  return data
})
