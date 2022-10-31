import { isPhone } from '~~/utils/is'
import { TimeUnitMap } from '~~/utils/time'

interface Query {
  phone: string
}

export default defineEventHandler(async (event) => {
  event.context.cache = { ttl: TimeUnitMap.hour }

  const { phone, type = 'text' } = useQuery<Query>(event)

  if (!phone)
    throw createError({ statusCode: 400, message: '手机号不能为空' })

  if (!isPhone(phone))
    throw createError({ statusCode: 400, message: '手机号格式错误' })

  const data = await (await fetch(`https://cx.shouji.360.cn/phonearea.php?number=${phone}`)).json()
  if (type === 'text')
    return data.data.province + data.data.city + data.data.sp
  else
    return data.data
})
