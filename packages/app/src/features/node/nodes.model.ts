import { Thunk } from 'easy-peasy'
import { Injections, RootModel } from 'src/features/root/root.model'
import { CrudRepository } from 'src/repository'
import { Data } from 'src/types/data'
import { Node, NodeId } from 'src/types/node'

export interface NodesModel extends CrudRepository<Node, NodeId> {
  $create: Thunk<
    NodesModel,
    {
      id?: string
      name: string
      tags: NodeId[]
    },
    Injections,
    RootModel,
    NodeId
  >

  tags$add: Thunk<
    NodesModel,
    {
      id: NodeId
      tag: NodeId
    }
  >
  tags$remove: Thunk<
    NodesModel,
    {
      node: NodeId
      tag: NodeId
    }
  >

  data$set: Thunk<
    NodesModel,
    {
      id: NodeId
      type: NodeId
      data: Data.Any
    }
  >
  data$delete: Thunk<
    NodesModel,
    {
      id: NodeId
      type: NodeId
    }
  >
}
