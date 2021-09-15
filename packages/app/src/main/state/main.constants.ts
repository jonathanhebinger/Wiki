import { Template } from '@brainote/common'

export const TEMPLATE_NOTE: Template = {
  id: 'note',
  name: 'note',
  info: '',
  keys: [
    [
      'tags',
      {
        name: 'Tags',
        type: { type: 'join', template: 'note', reflect: 'tagged' },
        required: true,
      },
    ],
    ['name', { name: 'Name', type: { type: 'string' }, required: true }],
    ['note', { name: 'Note', type: { type: 'string' }, required: true }],
    [
      'tagged',
      {
        name: 'Tagged',
        type: { type: 'join', template: 'note', reflect: 'tags' },
        required: true,
      },
    ],
  ],
}
export const TEMPLATE_TEMPLATE: Template = {
  id: 'template',
  name: 'template',
  info: '',
  keys: [
    ['name', { name: 'Name', type: { type: 'string' }, required: true }],
    ['info', { name: 'Info', type: { type: 'string' }, required: true }],
    [
      'keys',
      {
        name: 'Keys',
        type: {
          type: 'map',
          of: {
            type: 'object',
            keys: [
              ['name', { name: 'Name', type: { type: 'string' } }],
              ['type', { name: 'Type', type: { type: 'type' } }],
              ['required', { name: 'Required', type: { type: 'boolean' } }],
            ],
          },
          name: ['name'],
        },
        required: true,
      },
    ],
  ],
}

export const TEMPLATES = [TEMPLATE_TEMPLATE, TEMPLATE_NOTE]
