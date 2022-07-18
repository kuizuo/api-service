export type ReturnType = 'IMG' | 'JSON' | 'TEXT' | 'LOCATION' | 'HTML' | 'SCRIPT' | 'ALL';

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
  returnType: ReturnType
  example: string
}

export interface IApiInfo extends Pick<IApiDoc, 'id' | 'name' | 'desc'> { }
