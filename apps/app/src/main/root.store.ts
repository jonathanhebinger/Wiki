import { createStore, createTypedHooks } from 'easy-peasy'

import { navModel } from '../nav'
import { RootModel } from './root.model'
import { MainState } from './state/main.model'
import { MainSelector } from './state/main.selector'
import { mainModel } from './state/main.store'

export const store = createStore({
  main: mainModel,
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

export function useMain(): MainState
export function useMain<R>(selector: MainSelector<R>): R
export function useMain(selector?: MainSelector<any>): any {
  return useModel(state => (selector ? selector(state.main) : state.main))
}
export function useMainActions() {
  return useActions(state => state.main)
}
