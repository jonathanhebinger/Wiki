import { Node } from './node'
import { Type } from './type'

export type Data = Data.Any
export namespace Data {
  export type Array = Any[]
  export type Object = { [index: string]: Any }
  export type Any =
    | undefined
    | boolean
    | number
    | string
    | Array
    | Object
    | Node['id']
    | Type.Any
}
