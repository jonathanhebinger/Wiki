import { Data } from './data'
import { Id } from './id'
import { TemplateId } from './template'

export type NodeId = Id<'node'>
export type Node = {
  id: NodeId
  name: string
  info: string
  templates: TemplateId[]
  data: {
    [index: string]: Data.Any
  }
}
