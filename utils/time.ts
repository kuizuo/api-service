import dayjs from 'dayjs'

// 获取不同时间单位的毫秒时间

export const TimeUnitMap = {
  year: 365 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
  millisecond: 1,
}

export const getTodayRemainMillisecond = () => {
  const now = dayjs()
  return now.endOf('day').diff(now, 'millisecond')
}

