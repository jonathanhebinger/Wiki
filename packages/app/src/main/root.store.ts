import { createStore, createTypedHooks } from 'easy-peasy'

import { navModel } from '../nav/nav.store'
import { RootModel } from './root.model'
import { mainStore } from './state/main.store'

export const store = createStore({
  main: mainStore,
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

export function useMain() {
  return useModel(state => state.main)
}
export function useNodesActions() {
  return useActions(state => state.main)
}
