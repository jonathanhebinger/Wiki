export namespace Util {
  export type Id<Key extends string> = string & { key?: Key }
}

export interface Node {
  id: Node.Id

  name: string
  tags: Node.Id[]
  data: Node.Data[]
  info?: Node.Info

  creation: number
  modification: number
}

export namespace Node {
  export type Id = Util.Id<'node'>
  export type Info = any
  export type Data = { [index: string]: Data_Item }
  export type Data_Item = any
}

export type Data = Data.Any
export namespace Data {
  export type Array = Any[]
  export type Object = { [index: string]: Any }
  export type Any = boolean | number | string | Array | Object | Node.Id
}
