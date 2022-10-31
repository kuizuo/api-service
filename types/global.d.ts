import 'h3'

interface Cache {
  ttl: number
}

declare module 'h3' {
  export interface H3EventContext  {
    cache: Cache
  }
}