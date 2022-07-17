
export interface IApiParam {
  name: string
  value: string
  type: string
  desc: string
  required: boolean
}

export interface IApiDoc {
  id: string
  name: string
  desc: string
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  params: IApiParam[]
  returnType: string
  example: string
}

export interface IApiInfo extends Pick<IApiDoc, 'id' | 'name' | 'desc'> { }
