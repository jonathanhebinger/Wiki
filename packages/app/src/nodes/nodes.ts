import { Key, Node, Template, Type } from '@brainote/common'

const ROOT_KEYS: Key[] = [
  {
    id: 'root.name',
    'root.name': 'Name',
    'root.info': '',
    'root.tags': ['key'],
    'root.tagged': [],
    'key.required': true,
    'key.type': { type: 'string' },
  },
  {
    id: 'root.info',
    'root.name': 'Info',
    'root.info': '',
    'root.tags': ['key'],
    'root.tagged': [],
    'key.required': true,
    'key.type': { type: 'string' },
  },
  {
    id: 'root.tags',
    'root.name': 'Tags',
    'root.info': '',
    'root.tags': ['key'],
    'root.tagged': [],
    'key.required': true,
    'key.type': {
      type: 'join',
      template: 'root',
      reflect: 'root.tagged',
    },
  },
  {
    id: 'root.tagged',
    'root.name': 'Tagged',
    'root.info': '',
    'root.tags': ['key'],
    'key.required': true,
    'root.tagged': [],
    'key.type': {
      type: 'join',
      template: 'root',
      reflect: 'root.tags',
    },
  },
]
const ROOT_TEMPLATE: Template = {
  id: 'root',
  'root.name': 'Root',
  'root.info': '',
  'root.tags': ['template'],
  'root.tagged': [],
  'template.keys': ['root.tags', 'root.name', 'root.info', 'root.tagged'],
}

const KEY_KEYS: Key[] = [
  {
    id: 'key.required',
    'root.name': 'Key::required',
    'root.info': '',
    'root.tags': ['key'],
    'root.tagged': [],
    'key.required': true,
    'key.type': { type: 'boolean' },
  },
  {
    id: 'key.type',
    'root.name': 'Key::type',
    'root.info': '',
    'root.tags': ['key'],
    'root.tagged': [],
    'key.required': true,
    'key.type': { type: 'type' },
  },
  {
    id: 'key.used',
    'root.name': 'Key::used',
    'root.info': '',
    'root.tags': ['key'],
    'root.tagged': [],
    'key.required': true,
    'key.type': { type: 'boolean' },
  },
]
const KEY_TEMPLATE: Template = {
  id: 'key',
  'root.name': 'Key',
  'root.info': '',
  'root.tags': ['template'],
  'template.keys': ['key.required', 'key.type', 'key.used'],
  'root.tagged': [
    'root.name',
    'root.info',
    'root.tags',
    'key.required',
    'key.type',
    'key.used',
    'template.keys',
  ],
}

const TEMPLATE_KEYS: Key[] = [
  {
    id: 'template.keys',
    'root.name': 'Template::keys',
    'root.info': '',
    'root.tags': ['key'],
    'root.tagged': [],
    'key.required': true,
    'key.type': { type: 'join', template: 'key' },
  },
]
const TEMPLATE_TEMPLATE: Template = {
  id: 'template',
  'root.name': 'Template',
  'root.info': '',
  'root.tags': ['template'],
  'root.tagged': ['root', 'key', 'template'],
  'template.keys': ['template.keys'],
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
  'root.tags': ['type']
  'type-template.type': Type.Any
  //'type-template.default': any
}

const TYPES: TypeNode[] = [
  {
    id: 'type.object',
    'root.name': 'Template::keys',
    'root.info': '',
    'root.tags': ['type'],
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
  } as any,
]

const test: Key = {
  id: 'template.structure',
  'root.name': 'Template::keys',
  'root.info': '',
  'root.tags': ['key'],
  'root.tagged': [],
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
