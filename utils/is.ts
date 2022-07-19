export function isPhone(val: string) {
  return /^1[3-9]\d{9}$/.test(val)
}

export function isExternal(val: string) {
  return /^(http|https):\/\//.test(val)
}
