import { thunk } from 'easy-peasy'
import { NodesModel } from 'src/features/node/nodes.model'
import { Node_System } from 'src/features/node/system'
import { Node } from 'src/features/node/type'
import { crudRepository } from 'src/repository'

export const nodes_model: NodesModel = {
  ...crudRepository({ initialState: Node_System }),

  $create: thunk((actions, { tags }, { getStoreActions }) => {
    const id = getStoreActions().id$generate()

    const node: Node = {
      id,
      name: 'New Node',
      tags: [],
      tagged: [],
      data: [],
    }

    actions.crud.addOne(node)

    tags.forEach(tag => {
      actions.tags$add({ node: node.id, tag })
    })

    return id
  }),

  tags$add: thunk((actions, payload) => {
    actions.crud.updateMany([
      {
        id: payload.node,
        patch: {
          tags: tags =>
            tags.includes(payload.tag) ? tags : [...tags, payload.tag],
        },
      },
      {
        id: payload.tag,
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
          tags: tags => tags.filter(parent => parent !== payload.tag),
        },
      },
      {
        id: payload.tag,
        patch: {
          tagged: tagged => tagged.filter(child => child !== payload.node),
        },
      },
    ])
  }),

  data$set: thunk((actions, { id: node, data, type }) => {
    console.log(type, {
      data: {
        [type]: data,
      },
    })
    actions.crud.updateOne({
      id: node,
      patch: {
        data: {
          [type]: data,
        },
      },
    })
  }),
  data$delete: thunk((actions, { id: node, type }) => {
    actions.crud.updateOne({
      id: node,
      patch: {
        data: data => {
          delete data[type]
        },
      },
    })
  }),
}
