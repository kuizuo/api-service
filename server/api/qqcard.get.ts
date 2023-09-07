interface Query {
  qq: string
}

export default defineEventHandler(async (event) => {
  const { qq } = getQuery<Query>(event)

  if (!qq)
    throw createError({ statusCode: 400, message: 'QQ不能为空' })

  return await sendRedirect(event, `tencent://ContactInfo/?subcmd=ViewInfo&puin=0&uin=${qq}`, 302)
})
