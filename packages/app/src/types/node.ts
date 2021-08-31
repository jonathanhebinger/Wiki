import { Data } from './data'
import { Id } from './id'

export type NodeId = Id<'node'>
export type Node = {
  id: NodeId
  name: string
  tags: NodeId[]
  tagged: NodeId[]
  data: { [index: string]: Data.Any }
  info: any
}
