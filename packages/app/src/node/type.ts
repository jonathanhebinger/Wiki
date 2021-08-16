export type Id<Key extends string> = string & { key?: Key }

export type Node_Id = Id<'node'>
export type Node_Info = any
export type Node_Data = { [index: string]: Node_Data_Item }
export type Node_Data_Item = any

export type Node = {
  id: Node_Id

  tags: Node_Id[]
  tagged: Node_Id[]

  name: string
  info?: Node_Info
  data: Node_Data

  references?: Node_Id[]
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
    keys: {
      name: string
      type: Any
      required: boolean
    }[]
  }

  export type Node = Base<'node'>

  export type Any = Type | Boolean | Number | String | Array | Object | Node
}
