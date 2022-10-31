import 'h3'

interface Limit {
  count: number
}

interface Cache {
  ttl: number
}

declare module 'h3' {
  export interface H3EventContext  {
    limit: Limit
    cache: Cache
  }
}