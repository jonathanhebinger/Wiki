import { Thunk, thunk } from 'easy-peasy'
import { Node_System } from 'src/node/system'
import { Node, Node_Id } from 'src/node/type'
import { CrudRepository, crudRepository } from 'src/repository'

export interface Node_Repo_Model extends CrudRepository<Node, Node_Id> {
  tags$add: Thunk<Node_Repo_Model, { node: Node_Id; parent: Node_Id }>
  tags$remove: Thunk<Node_Repo_Model, { node: Node_Id; parent: Node_Id }>

  tagged$add: Thunk<Node_Repo_Model, { node: Node_Id; child: Node_Id }>
  tagged$remove: Thunk<Node_Repo_Model, { node: Node_Id; child: Node_Id }>
}

export const node_repo_model: Node_Repo_Model = {
  ...crudRepository({ initialState: Node_System }),

  tags$add: thunk((actions, payload) => {
    actions.crud.updateMany([
      {
        id: payload.node,
        patch: {
          tags: tags =>
            tags.includes(payload.parent) ? tags : [...tags, payload.parent],
        },
      },
      {
        id: payload.parent,
        patch: {
          tagged: tagged =>
            tagged.includes(payload.node) ? tagged : [...tagged, payload.node],
        },
      },
    ])
  }),
  tags$remove: thunk((actions, payload) => {
    actions.crud.updateMany([
      {
        id: payload.node,
        patch: {
          tags: tags => tags.filter(parent => parent !== payload.parent),
        },
      },
      {
        id: payload.parent,
        patch: {
          tagged: tagged => tagged.filter(child => child !== payload.node),
        },
      },
    ])
  }),

  tagged$add: thunk((actions, payload) => {
    actions.tags$add({ node: payload.child, parent: payload.node })
  }),
  tagged$remove: thunk((actions, payload) => {
    actions.tags$remove({ node: payload.child, parent: payload.node })
  }),
}
