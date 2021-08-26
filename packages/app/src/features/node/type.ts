export namespace Util {
  export type Id<Key extends string> = string & { key?: Key }
}

export type Node_Id = Util.Id<'node'>
export type Node_Info = any
export type Node_Data = { [index: string]: Node_Data_Item }
export type Node_Data_Item = any

export type Node = {
  id: Node.Id

  tags: Node.Id[]
  tagged: Node.Id[]

  name: string
  info?: Node.Info
  data: Node.Data

  references?: Node_Id[]
}

export namespace Node {
  export type Id = Util.Id<'node'>
  export type Info = any
  export type Data = { [index: string]: Node_Data_Item }
  export type Data_Item = any
}

export namespace Type {
  export type Base<Type extends string> = { type: Type }

  export type Type = Base<'type'>

  export type Boolean = Base<'boolean'>
  export type Number = Base<'number'>
  export type String = Base<'string'>

  export type Array = Base<'array'> & {
    of: Any
  }

  export type Object = Base<'object'> & {
    keys: ObjectKey[]
  }
  export type ObjectKey = {
    id: string
    name: string
    type: Any
    required: boolean
  }

  export type Node = Base<'node'>

  export type Any = Type | Boolean | Number | String | Array | Object | Node
}

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

export namespace Filter {
  export type Array = {
    type: 'match-none' | 'match-some' | 'match-every'
    matcher: any
  }

  export type Object = {
    type: 'match-none' | 'match-some' | 'match-every'
    matcher: any
  }

  export type NumberBase = {
    type: 'sup' | 'sup-strict' | 'inf' | 'inf-strict' | 'equal' | 'diff'
    to: number
  }
  export type NumberRange = {
    type: 'between' | 'outside'
    range: [number, number]
  }
  export type Number = NumberBase | NumberRange

  export type Boolean = boolean

  export type Logic =
    | { type: 'or' | 'and'; filters: any[] }
    | { type: 'not'; filter: any }
}
