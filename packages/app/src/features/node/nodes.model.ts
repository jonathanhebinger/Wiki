import { Thunk } from 'easy-peasy'
import { Data, Node } from 'src/features/node/type'
import { Injections, RootModel } from 'src/features/root/root.model'
import { CrudRepository } from 'src/repository'

export interface NodesModel extends CrudRepository<Node, Node.Id> {
  $create: Thunk<
    NodesModel,
    {
      id?: string
      name: string
      tags: Node.Id[]
    },
    Injections,
    RootModel,
    Node.Id
  >

  tags$add: Thunk<
    NodesModel,
    {
      id: Node.Id
      tag: Node.Id
    }
  >
  tags$remove: Thunk<
    NodesModel,
    {
      node: Node.Id
      tag: Node.Id
    }
  >

  data$set: Thunk<
    NodesModel,
    {
      id: Node.Id
      type: Node.Id
      data: Data.Any
    }
  >
  data$delete: Thunk<
    NodesModel,
    {
      id: Node.Id
      type: Node.Id
    }
  >
}
