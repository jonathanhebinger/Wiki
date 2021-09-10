import { Data } from './data'
import { Id } from './id'

export type NodeId = Id<'node'>
export type Node = {
  id: NodeId
  'root.name': string
  'root.info': string
  'root.templates': NodeId[]
  [index: string]: Data.Any
}
