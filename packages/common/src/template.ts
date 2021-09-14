import { Data } from './data'
import { Id } from './id'
import { Node } from './node'
import { Type } from './type'

export type Key = Node & {
  'root.tags': ['key']
  'key.type': Type.Any
  'key.required': boolean
}

export type TemplateId = TemplateDataId
export type Template = {
  id: TemplateId
  name: string
  info: string
  keys: TemplateKey[]
}
export type TemplateKey = {
  id: string
  name: string
  type: Type.Any
  required: boolean
}

export type TemplateDataId = Id<'data'>
export type TemplateData = {
  id: TemplateDataId
  // node: NodeId[]
} & Data.Object
