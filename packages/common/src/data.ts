import { Type } from './type'

export type Data = Data.Any
export namespace Data {
  export type Array = Any[]
  export type Object = { [index: string]: Any }
  export type Map = [string | number, Any][]
  export type Any =
    | undefined
    | boolean
    | number
    | string
    | Map
    | Array
    | Object
    | Type.Any
}
