import { Actions, createStore, createTypedHooks, thunk } from 'easy-peasy'
import { navModel } from 'src/features/nav/nav.model'
import { nodes_model } from 'src/features/node/nodes.store'
import { RootModel } from 'src/features/root/root.model'
import { v4 } from 'uuid'

import { templates_model } from '../templates/templates.store'

export const store = createStore<RootModel>({
  nodes: nodes_model,
  nav: navModel,
  templates: templates_model,

  id$generate: thunk(() => v4()),
})

const typedHooks = createTypedHooks<RootModel>()

export const { useStoreState, useStore, useStoreDispatch } = typedHooks
export const useStoreActions = <R = Actions<RootModel>>(
  selector: (actions: Actions<RootModel>) => R = actions =>
    actions as unknown as R,
): R => typedHooks.useStoreActions(selector)
