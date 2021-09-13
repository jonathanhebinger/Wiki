import { Node, NodeId, Template } from '@brainote/common'
import {
  Action,
  action,
  Computed,
  computed,
  ThunkOn,
  thunkOn,
} from 'easy-peasy'

import { RootModel } from '../root/root.model'

export interface NavModel {
  opened: NodeId[]

  node: Computed<this, (id: NodeId) => Node, RootModel>
  template: Computed<this, (id: NodeId) => Template, RootModel>

  opened_nodes: Computed<this, Node[]>

  open: Action<this, NodeId>
  close: Action<this, NodeId>
  close_all: Action<this>

  on_create: ThunkOn<this, any, RootModel>
}

export const navModel: NavModel = {
  opened: [],

  node: computed([(state, store) => store.nodes.node], node => {
    return node
  }),
  template: computed([(state, store) => store.nodes.template], template => {
    return template
  }),

  opened_nodes: computed(state => {
    return [...state.opened].reverse().map(state.node)
  }),

  open: action((state, node_id) => {
    state.opened = state.opened.filter(item => {
      return item !== node_id
    })
    state.opened.push(node_id)
  }),
  close: action((state, node_id) => {
    state.opened = state.opened.filter(item => {
      return item !== node_id
    })
  }),
  close_all: action(state => {
    state.opened = []
  }),

  on_create: thunkOn(
    (_, store) => [store.nodes.create],
    (actions, target) => {
      actions.open(target.result.id)
    },
  ),
}
