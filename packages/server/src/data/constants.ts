import { Type } from '@brainote/common'

export const TYPE_NODE: Type.Object = {
  type: 'object',
  required: true,
  entries: [
    ['type', { type: 'link', required: true, reflect: true, with: 'type' }],
    ['data', { type: 'link', required: true, reflect: true, with: '$type' }],
  ],
}

export const TYPE_TYPE: Type.Object = {
  type: 'object',
  required: true,
  entries: [
    ['name', { type: 'text', required: true }],
    ['type', { type: 'type', name: '$name' }],
  ],
}

export const TYPE_FOLDER: Type.Object = {
  type: 'object',
  required: true,
  entries: [
    ['name', { type: 'text', required: false }],
    [
      'nodes',
      {
        type: 'list',
        required: false,
        of: { type: 'link', required: true, reflect: true, with: 'node' },
      },
    ],
  ],
}

export const TYPE_NOTE: Type.Object = {
  type: 'object',
  required: true,
  entries: [
    ['title', { type: 'text', required: false }],
    ['note', { type: 'text', required: true }],
  ],
}
