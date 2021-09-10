import { Key, Node, NodeId, Template } from '@brainote/common'
import constate from 'constate'

import { useActions, useModel } from '../root/root.store'

export interface NodeTemplate {
  template: Template
  keys: Key[]
}

export const [NodeProvider, useNode] = constate(({ id }: { id: NodeId }) => {
  const nodes = useModel(state => state.nodes)
  const actions = useActions(actions => actions.nodes)

  const node = nodes.node(id)

  const { name, info, data } = node

  function name$update(name: string) {
    actions.update({
      node_id: id,
      patch: { name },
    })
  }
  function info$update(info: string) {
    actions.update({
      node_id: id,
      patch: { info },
    })
  }

  const keys = Object.keys(data).map(nodes.key)
  const templates = node.templates.map(nodes.template).map(template => {
    const keys = template.data['template.keys'].map(nodes.key)

    return { template, keys }
  })

  return {
    id,
    name,
    info,
    data,
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
