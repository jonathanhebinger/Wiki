import { createStore, createTypedHooks } from 'easy-peasy'

import { navModel } from '../nav/nav.store'
import { nodesModel } from '../nodes/nodes.system'
import { RootModel } from './root.model'

export const store = createStore({
  nodes: nodesModel,
  nav: navModel,
})

export const { useStoreActions: useActions, useStoreState: useModel } =
  createTypedHooks<RootModel>()

export function useNav() {
  return useModel(state => state.nav)
}
export function useNavActions() {
  return useActions(state => state.nav)
}

export function useNodes() {
  return useModel(state => state.nodes)
}
export function useNodesActions() {
  return useActions(state => state.nodes)
}
