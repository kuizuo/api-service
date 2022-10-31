import { TimeUnitMap } from '~~/utils/time'

export default defineEventHandler(async (event) => {
  event.context.cache = { ttl: TimeUnitMap.second * 5 }
  const { name, postid } = useQuery(event)

  if (!name)
    throw createError({ statusCode: 400, message: '快递公司编号不能为空' })

  if (!postid)
    throw createError({ statusCode: 400, message: '快递单号不能为空' })

  const json = await (await fetch(`http://www.kuaidi100.com/query?type=${name}&postid=${postid}`)).json()
  return json
})
