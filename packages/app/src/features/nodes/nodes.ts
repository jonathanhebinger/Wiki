import { Key, Node, Template } from '@brainote/common'

const ROOT_KEYS: Key[] = [
  {
    id: 'root.name',
    'root.name': 'Name',
    'root.info': '',
    'root.templates': ['key'],
    'key.required': true,
    'key.type': { type: 'string' },
  },
  {
    id: 'root.info',
    'root.name': 'Info',
    'root.info': '',
    'root.templates': ['key'],
    'key.required': true,
    'key.type': { type: 'string' },
  },

  {
    id: 'root.templates',
    'root.name': 'Templates',
    'root.info': '',
    'root.templates': ['key'],
    'key.required': true,
    'key.type': { type: 'join', template: 'template', multiple: true },
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
    'root.name': 'key.required',
    'root.info': '',
    'root.templates': ['key'],
    'key.required': true,
    'key.type': { type: 'boolean' },
  },

  {
    id: 'key.type',
    'root.name': 'key.type',
    'root.info': '',
    'root.templates': ['key'],
    'key.required': true,
    'key.type': { type: 'type' },
  },
]
const KEY_TEMPLATE: Template = {
  id: 'key',
  'root.name': 'key',
  'root.info': '',
  'root.templates': ['template'],
  'template.keys': ['key.required', 'key.type'],
  'template.data': [
    'key.required',
    'key.type',
    'template.keys',
    'template.data',
  ],
}

const TEMPLATE_KEYS: Key[] = [
  {
    id: 'template.keys',
    'root.name': 'template.keys',
    'root.info': '',
    'root.templates': ['key'],
    'key.required': true,
    'key.type': { type: 'join', template: 'key', multiple: true },
  },

  {
    id: 'template.data',
    'root.name': 'template.data',
    'root.info': '',
    'root.templates': ['key'],
    'key.required': true,
    'key.type': { type: 'join', template: '__self__', multiple: true },
  },
]
const TEMPLATE_TEMPLATE: Template = {
  id: 'template',
  'root.name': 'template',
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
