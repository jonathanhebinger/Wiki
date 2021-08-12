import { createStore, createTypedHooks } from 'easy-peasy'
import { Node_Repo_Model, node_repo_model } from 'src/node/model'

export type Store = {
  nodes: Node_Repo_Model
}
export const store = createStore<Store>({ nodes: node_repo_model })

export const { useStoreState, useStoreActions } = createTypedHooks<Store>()
