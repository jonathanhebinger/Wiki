import { Node } from '@brainote/common'
import { Action, action, Computed, computed } from 'easy-peasy'
import { enableMapSet } from 'immer'
import { NodesModel, nodesModel } from 'src/features/node/model'

export interface AppModel {
  nodes: NodesModel
  tags: Computed<this, Node[], AppModel>

  opened: Set<Node['id']>
  openedNodes: Computed<this, Node[]>

  favorite: Set<Node['id']>
  favoriteNodes: Computed<this, Node[]>

  open: Action<this, Node['id']>
  close: Action<this, Node['id']>

  toggleFavorite: Action<this, Node['id']>
}

enableMapSet()

export const app: AppModel = {
  nodes: nodesModel,

  tags: computed([state => state.nodes.list], nodes => {
    return nodes
  }),

  opened: new Set(),
  openedNodes: computed(
    [state => state.opened, state => state.nodes.list],
    (ids, list) => {
      return list.filter(node => ids.has(node.id))
    },
  ),

  favorite: new Set(),
  favoriteNodes: computed(
    [state => state.favorite, state => state.nodes.list],
    (ids, list) => {
      return list.filter(node => ids.has(node.id))
    },
  ),

  open: action((state, id) => {
    state.opened.add(id)
  }),
  close: action((state, id) => {
    state.opened.delete(id)
  }),

  toggleFavorite: action((state, id) => {
    if (state.favorite.has(id)) {
      state.favorite.delete(id)
    } else {
      state.favorite.add(id)
    }
  }),
}
