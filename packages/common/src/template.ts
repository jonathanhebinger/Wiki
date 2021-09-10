import { Node, NodeId } from './node'
import { Type } from './type'

export type Key = Node & {
  'root.templates': ['key']
  'key.type': Type.Any
  'key.required': boolean
}

export type Template = Node & {
  'root.templates': ['template']
  'template.keys': NodeId[]
  'template.data': NodeId[]
}
