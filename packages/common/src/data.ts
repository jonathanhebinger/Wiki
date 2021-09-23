import { TemplateId } from './template'
import { TemplateDataId } from './template.data'
import { Type } from './type'

export type Data = Data.Any
export namespace Data {
  export type DataPair = [string, Data]
  export type Join = [TemplateId, TemplateDataId]
  export type JoinList = Join[]
  export type List = Any[]
  export type Object = { [index: string]: Any }
  export type Map = [string | number, Any][]
  export type Any =
    | undefined
    | boolean
    | number
    | string
    | Map
    | List
    | Object
    | Join
    | JoinList
    | Type.Any
}
