import { Key, Node, NodeId, Template } from '@brainote/common'
import { createSystemContext } from 'src/bang/hooks/system'
import { v4 } from 'uuid'

import { createSystem } from '../../bang/system'
import { Data$get_default } from '../data/data.default'

const KEY_KEYS: Key[] = [
  {
    id: 'key.required',
    name: 'key.required',
    info: '',
    templates: ['key'],
    data: {
      'key.required': true,
      'key.type': { type: 'boolean' },
    },
  },
  {
    id: 'key.type',
    name: 'key.type',
    info: '',
    templates: ['key'],
    data: {
      'key.required': true,
      'key.type': { type: 'type' },
    },
  },
]
const KEY_TEMPLATE: Template = {
  id: 'key',
  name: 'key',
  info: '',
  templates: ['template'],
  data: {
    'template.keys': ['key.required', 'key.type'],
    'template.data': [
      'key.required',
      'key.type',
      'template.keys',
      'template.data',
    ],
  },
}

const TEMPLATE_KEYS: Key[] = [
  {
    id: 'template.keys',
    name: 'template.keys',
    info: '',
    templates: ['key'],
    data: {
      'key.required': true,
      'key.type': { type: 'join', template: 'key', multiple: true },
    },
  },
  {
    id: 'template.data',
    name: 'template.data',
    info: '',
    templates: ['key'],
    data: {
      'key.required': true,
      'key.type': { type: 'join', multiple: true },
    },
  },
]
const TEMPLATE_TEMPLATE: Template = {
  id: 'template',
  name: 'template',
  info: '',
  templates: ['template'],
  data: {
    'template.keys': ['template.keys', 'template.data'],
    'template.data': ['template', 'key'],
  },
}

const NODES: Node[] = [
  ...KEY_KEYS,
  KEY_TEMPLATE,
  ...TEMPLATE_KEYS,
  TEMPLATE_TEMPLATE,
]

export const nodes = createSystem({
  list: NODES as Node[],

  get keys(): Key[] {
    return this.list.filter(node => {
      return node.templates.includes('key')
    }) as Key[]
  },
  get templates(): Template[] {
    return this.list.filter(node => {
      return node.templates.includes('template')
    }) as Template[]
  },

  get node() {
    const nodes = this.list

    return (node_id: NodeId) => {
      return nodes.find(node => {
        return node.id === node_id
      }) as Node
    }
  },
  get template() {
    const templates = this.templates

    return (template_id: NodeId) => {
      return templates.find(node => {
        return node.id === template_id
      }) as Template
    }
  },
  get key() {
    const key = this.keys

    return (key_if: NodeId) => {
      return key.find(node => {
        return node.id === key_if
      }) as Key
    }
  },

  create(name: string) {
    const node: Node = {
      id: v4(),
      name,
      info: '',
      templates: [],
      data: {},
    }

    this.list.push(node)

    return node
  },
  update(node_id: NodeId, patch: Partial<Node> | ((node: Node) => void)) {
    const node = this.node(node_id)

    if (typeof patch === 'function') {
      patch(node)
    } else {
      Object.assign(node, patch)
    }
  },
  delete(node_id: NodeId) {
    this.list = this.list.filter(node => node.id !== node_id)
  },

  update_data(node_id: NodeId, data: Node['data']) {
    const node = this.node(node_id)

    Object.entries(data).map(([key_id, data]) => {
      const key = this.key(key_id)

      node.data[key.id] = data
    })
  },

  attach(node_id: NodeId, template_id: NodeId) {
    const node = this.node(node_id)
    const template = this.template(template_id)

    node.templates.push(template.id)

    template.data['template.keys'].map(key_id => {
      const key = this.key(key_id)

      if (node.data[key.id] !== undefined) return
      if (!key.data['key.required']) return

      node.data[key.id] = Data$get_default(key.data['key.type'])
    })

    template.data['template.data'].push(template.id)
  },
})

export const [NodesContextProvider, useNodesContext] =
  createSystemContext(nodes)
