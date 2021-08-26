import { thunk } from 'easy-peasy'
import { NodesModel } from 'src/features/node/nodes.model'
import { Node } from 'src/features/node/type'
import { crudRepository } from 'src/repository'

export const nodes_model: NodesModel = {
  ...crudRepository({}),

  $create: thunk(
    (actions, { id, name = 'New Node', tags }, { getStoreActions }) => {
      id = id || getStoreActions().id$generate()

      const node: Node = {
        id,
        name,
        tags: [],
        tagged: [],
        data: {},
      }

      actions.crud.addOne(node)

      tags.forEach(tag => {
        actions.tags$add({ id: node.id, tag })
      })

      return id
    },
  ),

  tags$add: thunk((actions, payload) => {
    actions.crud.updateMany([
      {
        id: payload.id,
        patch: {
          tags: tags =>
            tags.includes(payload.tag) ? tags : [...tags, payload.tag],
        },
      },
      {
        id: payload.tag,
        patch: {
          tagged: tagged =>
            tagged.includes(payload.id) ? tagged : [...tagged, payload.id],
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

  data$set: thunk((actions, { id, data, type }) => {
    actions.crud.updateOne({
      id,
      patch: node => {
        node.data[type] = data
      },
    })
  }),
  data$delete: thunk((actions, { id, type }) => {
    actions.crud.updateOne({
      id,
      patch: node => {
        delete node.data[type]
      },
    })
  }),
}
