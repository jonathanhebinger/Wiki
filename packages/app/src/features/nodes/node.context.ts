import { Data, Key, Node, NodeId, Template } from '@brainote/common'
import constate from 'constate'

import { useNodesContext } from './nodes.system'

export interface NodeTemplate {
  template: Template
  data: {
    key: Key
    data: Data.Any
  }[]
}

export const [NodeProvider, useNode] = constate(
  ({ nodeId: node_id }: { nodeId: NodeId }) => {
    const [nodes, actions] = useNodesContext()

    const node = nodes.node(node_id)

    const { id, name, info, data } = node

    function name$update(name: string) {
      actions.update(id, { name })
    }
    function info$update(info: string) {
      actions.update(id, { info })
    }

    const keys = Object.keys(data).map(nodes.key)
    const templates = node.templates.map(nodes.template).map(template => {
      return {
        template,
        data: template.data['template.keys'].map(nodes.key).map(key => {
          return {
            key,
            data: data[key.id],
          }
        }),
      }
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
  },
)

export interface NodeDataKey {
  typeNode: Node
  type: any
  data: any
}
