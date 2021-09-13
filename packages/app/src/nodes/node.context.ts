import { Key, NodeId, Template } from '@brainote/common'
import constate from 'constate'

import { useNodes } from '../root'

export interface NodeTemplate {
  template: Template
  keys: Key[]
}

export const [NodeProvider, useNode] = constate(({ id }: { id: NodeId }) => {
  const nodes = useNodes()

  const saved = nodes.node(id)
  const draft = nodes.drafts.get(id) || saved

  const keys = Object.keys(saved).map(nodes.key)
  const templates = saved['root.templates']
    .map(nodes.template)
    .map(template => {
      const keys = template['template.keys'].map(nodes.key)

      return { template, keys }
    })

  return {
    id,
    name: saved['root.name'],
    keys,
    saved,
    draft,
    templates,
  }
})
