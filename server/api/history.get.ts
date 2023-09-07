import _ from 'lodash'
import { getTodayRemainMillisecond } from '~~/utils/time'

export default defineEventHandler(async (event) => {
  event.context.cache = { ttl: getTodayRemainMillisecond() }

  const tMonth = String(new Date().getMonth() + 1)
  const tDay = String(new Date().getDate())

  let { month = tMonth, day = tDay } = getQuery(event)

  if (!(_.inRange(Number(month), 1, 13) && _.inRange(Number(day), 1, 32)))
    throw createError({ statusCode: 400, message: '日期或月份不正确' })

  month = month.padStart(2, '0')
  day = day.padStart(2, '0')

  const data = await (await fetch(`https://baike.baidu.com/cms/home/eventsOnHistory/${month}.json`)).json()

  return data[month][month + day].map((h: any) => (
    {
      title: h.title.replace(/<\/?.+?>/g, ''),
      ...(_.pick(h, ['year', 'link'])),
      desc: h.desc.replace(/<\/?.+?>/g, ''),
    }
  ))
})
