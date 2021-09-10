import { Key, Node, NodeId, Template, TemplateId } from '@brainote/common'
import { Action, action, Computed, computed, Thunk, thunk } from 'easy-peasy'
import { v4 } from 'uuid'

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
      'key.type': { type: 'join', template: '__self__', multiple: true },
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

type Patch = Partial<Node> | ((node: Node) => void)

export interface NodesModel {
  list: Node[]
  keys: Computed<this, Key[]>
  templates: Computed<this, Template[]>

  node: Computed<this, (id: NodeId) => Node>
  key: Computed<this, (id: NodeId) => Key>
  template: Computed<this, (id: NodeId) => Template>

  insert: Action<this, Node>
  create: Thunk<this, { name: string }, any, {}, Node>
  update: Action<this, { node_id: NodeId; patch: Patch }>
  delete: Action<this, { node_id: NodeId }>

  update_data: Action<this, { node_id: NodeId; data: Node['data'] }>

  attach: Action<this, { node_id: NodeId; template_id: TemplateId }>
  detach: Action<this, { node_id: NodeId; template_id: TemplateId }>
}

export const nodesModel: NodesModel = {
  list: NODES,

  keys: computed(state => {
    return state.list.filter(node => {
      return node.templates.includes('key')
    }) as Key[]
  }),
  templates: computed(state => {
    return state.list.filter(node => {
      return node.templates.includes('template')
    }) as Template[]
  }),

  node: computed(state => {
    return (node_id: NodeId) => {
      return state.list.find(node => {
        return node.id === node_id
      }) as Node
    }
  }),
  template: computed(state => {
    return (template_id: NodeId) => {
      return state.templates.find(template => {
        return template.id === template_id
      }) as Template
    }
  }),
  key: computed(state => {
    return (key_id: NodeId) => {
      return state.keys.find(key => {
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
      name,
      info: '',
      templates: [],
      data: {},
    }

    actions.insert(node)

    return node
  }),
  update: action((state, { node_id, patch }) => {
    const node = state.node(node_id)

    if (typeof patch === 'function') {
      patch(node)
    } else {
      Object.assign(node, patch)
    }
  }),
  delete: action((state, { node_id }) => {
    state.list = state.list.filter(node => node.id !== node_id)
  }),

  update_data: action((state, { node_id, data }) => {
    const node = state.node(node_id)

    Object.entries(data).map(([key_id, data]) => {
      const key = state.key(key_id)

      node.data[key.id] = data
    })
  }),

  attach: action((state, { node_id, template_id }) => {
    const node = state.node(node_id)
    const template = state.template(template_id)

    node.templates.push(template.id)

    template.data['template.keys'].map(key_id => {
      const key = state.key(key_id)

      if (node.data[key.id] !== undefined) return
      if (!key.data['key.required']) return

      node.data[key.id] = Data$get_default(key.data['key.type'])
    })

    template.data['template.data'].push(template.id)
  }),

  detach: action((state, { node_id, template_id }) => {
    const node = state.node(node_id)

    node.templates = node.templates.filter(id => id !== template_id)

    const keys = node.templates
      .map(state.template)
      .map(template => template.data['template.keys'])
      .flat()

    Object.keys(node.data).map(key => {
      if (!keys.includes(key)) {
        delete node.data[key]
      }
    })
  }),
}
