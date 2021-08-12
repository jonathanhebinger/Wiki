export type Id<Key extends string> = string & { key?: Key }

export type Node_Id = Id<'node'>
export type Node_Value = any
export type Node_About = any
export type Node = {
  id: Node_Id

  name: string

  parents: Node_Id[]
  children: Node_Id[]

  about: Node_About | null
  value: Value_Id | null

  references: Node_Id[]
}
export type Value_Id = Id<'value'>
export type Value = {
  id: Value_Id

  parents: Node_Id[]

  value: Node_Value
}

export type Template_Id = Id<'template'>
export type Template = {
  id: Template_Id

  root: Node_Id

  keys: {
    node: Node_Id
    required: boolean
  }[]
}

/*
Values are final, no children
Values can be transformed to Nodes -> Node with Value as Child
Nodes can only have one Value
*/
