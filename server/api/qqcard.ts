export default defineEventHandler(async (event) => {
  event.context.cache = { disable: true }
  const { qq } = useQuery(event)

  if (!qq)
    throw createError({ statusCode: 400, message: 'QQ不能为空' })

  event.res.statusCode = 302
  return await sendRedirect(event, `tencent://ContactInfo/?subcmd=ViewInfo&puin=0&uin=${qq}`)
})
