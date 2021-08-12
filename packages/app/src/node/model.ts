import { Thunk, thunk } from 'easy-peasy'
import { Node, Node_Id } from 'src/node/type'
import { CrudRepository, crudRepository } from 'src/repository'

export interface Node_Repo_Model extends CrudRepository<Node, Node_Id> {
  parents$add: Thunk<Node_Repo_Model, { node: Node_Id; parent: Node_Id }>
  parents$remove: Thunk<Node_Repo_Model, { node: Node_Id; parent: Node_Id }>

  children$add: Thunk<Node_Repo_Model, { node: Node_Id; child: Node_Id }>
  children$remove: Thunk<Node_Repo_Model, { node: Node_Id; child: Node_Id }>
}

export const node_repo_model: Node_Repo_Model = {
  ...crudRepository({}),

  parents$add: thunk((actions, payload) => {
    actions.crud.updateMany([
      {
        id: payload.node,
        patch: {
          parents: parents => [...parents, payload.node],
        },
      },
      {
        id: payload.parent,
        patch: {
          children: children => [...children, payload.node],
        },
      },
    ])
  }),
  parents$remove: thunk((actions, payload) => {
    actions.crud.updateMany([
      {
        id: payload.node,
        patch: {
          parents: parents =>
            parents.filter(parent => parent !== payload.parent),
        },
      },
      {
        id: payload.parent,
        patch: {
          children: children =>
            children.filter(child => child !== payload.node),
        },
      },
    ])
  }),

  children$add: thunk((actions, payload) => {
    actions.parents$add({ node: payload.child, parent: payload.node })
  }),
  children$remove: thunk((actions, payload) => {
    actions.parents$remove({ node: payload.child, parent: payload.node })
  }),
}
