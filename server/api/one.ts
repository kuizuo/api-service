/* result
{
    "id": 5233,
    "uuid": "9504a2a2-bab7-4c7d-b643-a6642ed5c55e",
    "hitokoto": "人间没有单纯的快乐，快乐总夹带着烦恼和忧虑。",
    "type": "d",
    "from": "杨绛",
    "from_who": "我们仨",
    "creator": "a632079",
    "creator_uid": 1044,
    "reviewer": 4756,
    "commit_from": "web",
    "created_at": "1583786494",
    "length": 22
}
*/

export default defineEventHandler(async (event) => {
  const { json = false } = useQuery(event)
  try {
    const data = await (await fetch('https://v1.hitokoto.cn/')).json()
    if (json) {
      return data
    }
    else {
      event.res.setHeader('Content-Type', 'text/html;charset=utf-8')
      return data.hitokoto
    }
  }
  catch (error) {
    // TODO: 接口出错 则上报错误信息
    console.error(error)
    return error
  }
})
