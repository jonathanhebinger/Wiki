import { Thunk } from 'easy-peasy'
import { NavModel } from 'src/features/nav/nav.model'
import { NodesModel } from 'src/features/node/nodes.model'

export type Injections = never

export interface RootModel {
  nodes: NodesModel
  nav: NavModel

  id$generate: Thunk<RootModel, never, Injections, RootModel, string>
}
