import { Data } from './data'
import { Id } from './id'

export type NodeId = Id<'node'>
export type Node = {
  id: NodeId
  draft?: Data.Object
} & Data.Object
