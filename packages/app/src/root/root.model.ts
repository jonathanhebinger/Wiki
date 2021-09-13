import { NavModel } from '../nav/nav.store'
import { NodesModel } from '../nodes/nodes.system'

export interface RootModel {
  nodes: NodesModel
  nav: NavModel
}
