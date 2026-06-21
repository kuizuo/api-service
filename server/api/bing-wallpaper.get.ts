interface Query {
  region?: 'zh-CN' | 'en-US' | 'ja-JP' | 'en-AU' | 'en-UK' | 'de-DE' | 'en-NZ' | 'en-CA'
}

export default defineCachedEventHandler(async (event) => {
  const { type = 'img', region = 'zh-CN' } = getQuery<Query>(event)

  // https://github.com/zkeq/Bing-Wallpaper-Action
  const data = await (await fetch(`https://raw.onmicrosoft.cn/Bing-Wallpaper-Action/main/data/${region}_all.json`)).json()

  if (type === 'img') {
    const url = `https://bing.com${data.data[0].url}`

    return await sendRedirect(event, url, 302)
  }
  else {
    return data
  }
}, {
  maxAge: TimeUnit.hour / 1000,
})
