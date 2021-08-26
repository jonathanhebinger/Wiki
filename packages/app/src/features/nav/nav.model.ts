import { Action, action, Computed, computed, ThunkOn, thunkOn } from 'easy-peasy'
import { Node } from 'src/features/node/type'
import { Injections, RootModel } from 'src/features/root/root.model'

interface NavOpenedInfo {
  id: Node['id']
  collapsed: boolean
}
interface NavOpenedInfoLinked extends NavOpenedInfo {
  node: Node
}

export interface NavModel {
  opened_ids: NavOpenedInfo[]
  opened_nodes: Computed<NavModel, NavOpenedInfoLinked[], RootModel>

  $open: Action<NavModel, Node['id']>
  $close: Action<NavModel, Node['id']>
  $close_all: Action<NavModel>

  on_nodes$create: ThunkOn<NavModel, Injections, RootModel>
}

export const navModel: NavModel = {
  opened_ids: [],
  opened_nodes: computed(
    [
      (state, _store) => state.opened_ids,
      (_state, store) => store.nodes.dictionnary,
    ],
    (infos, nodes) => {
      return infos.reverse().map(info => {
        return {
          ...info,
          node: nodes[info.id] as Node,
        }
      })
    },
  ),

  $open: action((state, id) => {
    state.opened_ids = state.opened_ids.filter(v => v.id !== id)
    state.opened_ids.push({ id, collapsed: false })
  }),
  $close: action((state, id) => {
    state.opened_ids = state.opened_ids.filter(v => v.id !== id)
  }),
  $close_all: action(state => {
    state.opened_ids = []
  }),

  on_nodes$create: thunkOn(
    (state, store) => store.nodes.$create,
    (actions, target) => {
      actions.$open(target.result)
    },
  ),
}
