export function gbkDecode(arrayBuffer: ArrayBuffer) {
  const text = new TextDecoder('gbk').decode(arrayBuffer)
  return text
}
