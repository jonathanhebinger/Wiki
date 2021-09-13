import { Key, Node, Template, Type } from '@brainote/common'

const ROOT_KEYS: Key[] = [
  {
    id: 'root.name',
    'root.name': 'Name',
    'root.info': '',
    'root.templates': ['key'],
    'key.required': true,
    'key.type': { type: 'string' },
    'key.used': true,
  },
  {
    id: 'root.info',
    'root.name': 'Info',
    'root.info': '',
    'root.templates': ['key'],
    'key.required': true,
    'key.type': { type: 'string' },
    'key.used': true,
  },

  {
    id: 'root.templates',
    'root.name': 'Templates',
    'root.info': '',
    'root.templates': ['key'],
    'key.required': true,
    'key.type': {
      type: 'join',
      template: 'template',
      reflect: 'template.data',
    },
    'key.used': true,
  },
]
const ROOT_TEMPLATE: Template = {
  id: 'root',
  'root.name': 'Root',
  'root.info': '',
  'root.templates': ['template'],
  'template.keys': ['root.name', 'root.info', 'root.templates'],
  'template.data': [],
}

const KEY_KEYS: Key[] = [
  {
    id: 'key.required',
    'root.name': 'Key::required',
    'root.info': '',
    'root.templates': ['key'],
    'key.required': true,
    'key.type': { type: 'boolean' },
    'key.used': true,
  },
  {
    id: 'key.type',
    'root.name': 'Key::type',
    'root.info': '',
    'root.templates': ['key'],
    'key.required': true,
    'key.type': { type: 'type' },
    'key.used': true,
  },
  {
    id: 'key.used',
    'root.name': 'Key::used',
    'root.info': '',
    'root.templates': ['key'],
    'key.required': true,
    'key.type': { type: 'boolean' },
    'key.used': true,
  },
]
const KEY_TEMPLATE: Template = {
  id: 'key',
  'root.name': 'Key',
  'root.info': '',
  'root.templates': ['template'],
  'template.keys': ['key.required', 'key.type', 'key.used'],
  'template.data': [
    'root.name',
    'root.info',
    'root.templates',
    'key.required',
    'key.type',
    'key.used',
    'template.keys',
    'template.data',
  ],
}

const TEMPLATE_KEYS: Key[] = [
  {
    id: 'template.keys',
    'root.name': 'Template::keys',
    'root.info': '',
    'root.templates': ['key'],
    'key.required': true,
    'key.type': { type: 'join', template: 'key' },
    'key.used': true,
  },
  {
    id: 'template.data',
    'root.name': 'Template::data',
    'root.info': '',
    'root.templates': ['key'],
    'key.required': true,
    'key.type': {
      type: 'join',
      template: '__self__',
      reflect: 'root.templates',
    },
    'key.used': true,
  },
]
const TEMPLATE_TEMPLATE: Template = {
  id: 'template',
  'root.name': 'Template',
  'root.info': '',
  'root.templates': ['template'],
  'template.keys': ['template.keys', 'template.data'],
  'template.data': ['template', 'key'],
}

export const NODES: Node[] = [
  ...ROOT_KEYS,
  ROOT_TEMPLATE,
  ...KEY_KEYS,
  KEY_TEMPLATE,
  ...TEMPLATE_KEYS,
  TEMPLATE_TEMPLATE,
]

interface TypeNode extends Node {
  'root.templates': ['type']
  'type-template.type': Type.Any
  //'type-template.default': any
}

const TYPES: TypeNode[] = [
  {
    id: 'type.object',
    'root.name': 'Template::keys',
    'root.info': '',
    'root.templates': ['type'],
    'type-template.type': {
      type: 'set',
      of: {
        type: 'object',
        keys: [
          {
            id: 'name',
            name: 'name',
            type: { type: 'string' },
          },
          {
            id: 'type',
            name: 'type',
            type: { type: 'type' },
          },
        ],
      },
    },
    // 'type-template.default': any,
  },
]

const test: Key = {
  id: 'template.structure',
  'root.name': 'Template::keys',
  'root.info': '',
  'root.templates': ['key'],
  'key.required': true,
  'key.type': {
    type: 'array',
    of: {
      type: 'multiple',
      list: [
        { name: 'key', type: { type: 'join', template: 'key' } },
        { name: 'section', type: { type: 'join', template: 'key' } },
      ],
    } as any,
  },
  'key.used': true,
}

type Enum = {
  type: 'enum'
  of: Type.Any
  keys: any[]
}

type Multiple = {
  type: 'multiple'
  list: {
    name: string
    type: Type.Any
  }[]
}
