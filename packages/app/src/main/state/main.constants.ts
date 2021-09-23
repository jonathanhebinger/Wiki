import { Template } from '@brainote/common'

export const TEMPLATE_NOTE: Template = {
  id: 'note',
  name: 'note',
  keys: [
    ['name', { name: 'Name', type: { type: 'string' } }],
    ['info', { name: 'Info', type: { type: 'string' } }],
    [
      'tags',
      { name: 'Tags', type: { type: 'join', template: 'note', on: 'tagged' } },
    ],
    [
      'tagged',
      { name: 'Tagged', type: { type: 'join', template: 'note', on: 'tags' } },
    ],
  ],
  namePath: 'name',
  data: [],
}

export const TEMPLATES = [TEMPLATE_NOTE]
