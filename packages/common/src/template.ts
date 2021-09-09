import { Node, NodeId } from './node'
import { Type } from './type'

export type TemplateKeyId = NodeId
export type Key = Node & {
  templates: ['key']
  data: {
    'key.type': Type.Any
    'key.required': boolean
  }
}

export type TemplateId = NodeId
export type Template = Node & {
  templates: ['template']
  data: {
    'template.keys': NodeId[]
    'template.data': NodeId[]
  }
}
