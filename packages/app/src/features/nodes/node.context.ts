import { Key, Node, NodeId, Template } from '@brainote/common'
import constate from 'constate'

import { useActions, useModel } from '../root/root.store'

export interface NodeTemplate {
  template: Template
  keys: Key[]
}

export const [NodeProvider, useNode] = constate(({ id }: { id: NodeId }) => {
  const nodes = useModel(state => state.nodes)
  const nodesActions = useActions(actions => actions.nodes)

  const node = nodes.node(id)

  function name$update(name: string) {
    nodesActions.update({
      node_id: id,
      patch: { name },
    })
  }
  function info$update(info: string) {
    nodesActions.update({
      node_id: id,
      patch: { info },
    })
  }

  const keys = Object.keys(node).map(nodes.key)
  const templates = node['root.templates'].map(nodes.template).map(template => {
    const keys = template['template.keys'].map(nodes.key)

    return { template, keys }
  })

  return {
    id,
    name: node['root.name'],
    info: node['root.info'],
    data: node,
    keys,
    templates,
    name$update,
    info$update,
  }
})

export interface NodeDataKey {
  typeNode: Node
  type: any
  data: any
}
