import { Data, Key, Node, NodeId, Template } from '@brainote/common'
import { Action, action, Computed, computed, Thunk, thunk } from 'easy-peasy'
import { v4 } from 'uuid'

import { Data$get_default } from '../data/data.default'
import { NODES } from './nodes'

type Patch<T extends Node> = Partial<T> | ((node: T) => void)

export interface NodesModel {
  list: Node[]
  keys: Computed<this, Key[]>
  templates: Computed<this, Template[]>

  node: Computed<this, (id: NodeId) => Node>
  key: Computed<this, (id: NodeId) => Key>
  template: Computed<this, (id: NodeId) => Template>

  insert: Action<this, Node>
  create: Thunk<this, { name: string }, any, {}, Node>
  update: Action<this, { node_id: NodeId; patch: Patch<Node> }>
  update_template: Thunk<this, { template_id: NodeId; patch: Patch<Template> }>
  delete: Action<this, { node_id: NodeId }>

  update_data: Thunk<this, { node_id: NodeId; data: Partial<Node> }>

  attach: Thunk<this, { node_id: NodeId; template_id: NodeId }>
  detach: Thunk<this, { node_id: NodeId; template_id: NodeId }>
}

export const nodesModel: NodesModel = {
  list: NODES,

  keys: computed(state => {
    return state.list.filter(node => {
      return node['root.templates'].includes('key')
    }) as Key[]
  }),
  templates: computed(state => {
    return state.list.filter(node => {
      return node['root.templates'].includes('template')
    }) as Template[]
  }),

  node: computed(state => {
    const nodes = state.list

    return (node_id: NodeId) => {
      return nodes.find(node => {
        return node.id === node_id
      }) as Node
    }
  }),
  template: computed(state => {
    const templates = state.templates

    return (template_id: NodeId) => {
      return templates.find(template => {
        return template.id === template_id
      }) as Template
    }
  }),
  key: computed(state => {
    const keys = state.keys

    return (key_id: NodeId) => {
      return keys.find(key => {
        return key.id === key_id
      }) as Key
    }
  }),

  insert: action((state, node) => {
    state.list.push(node)
  }),
  create: thunk((actions, { name }) => {
    const node: Node = {
      id: v4(),
      'root.name': name,
      'root.info': '',
      'root.templates': [],
    }

    actions.insert(node)

    return node
  }),
  update: action((state, { node_id, patch }) => {
    const node = state.list.find(node => node.id === node_id)

    if (!node) return

    if (typeof patch === 'function') {
      patch(node)
    } else {
      Object.assign(node, patch)
    }
  }),
  update_template: thunk((actions, { template_id, patch }) => {
    actions.update({
      node_id: template_id,
      patch: patch as Patch<Node>,
    })
  }),
  delete: action((state, { node_id }) => {
    state.list = state.list.filter(node => node.id !== node_id)
  }),

  update_data: thunk((actions, { node_id, data }, { getState }) => {
    Object.entries(data).map(([key_id, data]) => {
      if (key_id === 'id') return

      const key = getState().key(key_id)

      if (key.id === 'root.templates') {
        const node = getState().node(node_id)
        const templates = data as NodeId[]

        templates
          .filter(template_id => {
            return !node['root.templates'].includes(template_id)
          })
          .map(template_id => {
            actions.attach({ node_id, template_id })
          })

        node['root.templates']
          .filter(template_id => {
            return !templates.includes(template_id)
          })
          .map(template_id => {
            actions.detach({ node_id, template_id })
          })
      } else {
        actions.update({
          node_id,
          patch(node) {
            if (data === undefined) {
              delete node[key.id]
            } else {
              node[key.id] = data
            }
          },
        })
      }
    })
  }),

  attach: thunk((actions, { node_id, template_id }, { getState }) => {
    const template = getState().template(template_id)
    const node = getState().node(node_id)
    const data: Partial<Node> = {}

    template['template.keys'].map(getState().key).map(key => {
      if (node[key.id] !== undefined) return
      if (!key['key.required']) return

      data[key.id] = Data$get_default(key['key.type'])
    })

    actions.update_data({
      node_id,
      data,
    })
    actions.update({
      node_id,
      patch(node: Node) {
        node['root.templates'].push(template_id)
      },
    })
    actions.update_template({
      template_id,
      patch(template: Template) {
        template['template.data'].push(node_id)
      },
    })
  }),
  detach: thunk((actions, { node_id, template_id }, { getState }) => {
    const node = getState().node(node_id)
    const data: Data.Object = {}

    const keys = node['root.templates']
      .map(getState().template)
      .map(template => template['template.keys'])
      .flat()

    Object.keys(node).forEach(key => {
      if (keys.includes(key)) return

      data[key] = undefined
    })

    actions.update_data({
      node_id,
      data,
    })
    actions.update({
      node_id,
      patch(node: Node) {
        node['root.templates'] = node['root.templates'].filter(
          id => id !== template_id,
        )
      },
    })
  }),
}
