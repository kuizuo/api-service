declare namespace IApi {
  type DataType = 'text' | 'json' | 'img';
  type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

  interface Param {
    name: string
    value: string
    type: string
    desc: string
    required: boolean
  }

  interface Doc {
    id: string
    name: string
    desc: string
    path: string
    method: Method
    params: Param[]
    dataType: DataType
    example: string
  }

  interface Info extends Pick<Doc, 'id' | 'name' | 'desc'> { }
}


declare function useQuery<T extends Record<string, string>>(event: CompatibilityEvent): T & { type: IApi.DataType }