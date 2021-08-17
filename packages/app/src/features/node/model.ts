import { Node } from '@brainote/common'
import { Action, action, Computed, computed } from 'easy-peasy'

export interface NodesModel {
  data: Record<Node['id'], Node>
  list: Computed<this, Node[]>

  tags: Computed<this, Node[]>

  init: Action<this, Node[]>
  set: Action<this, Node[]>
  delete: Action<this, Node['id']>
}

export const nodesModel: NodesModel = {
  data: {},
  list: computed(state => [...Object.values(state.data)]),

  tags: computed([state => state.list], list => {
    return list
  }),

  init: action((state, payload) => {
    state.data = {}

    payload.forEach(node => {
      state.data[node.id] = node
    })
  }),
  set: action((state, payload) => {
    payload.forEach(node => {
      state.data[node.id] = node
    })
  }),
  delete: action((state, payload) => {
    delete state.data[payload]
  }),
}
