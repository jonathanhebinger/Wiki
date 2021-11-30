import { Template } from '@brainote/domain'

export const TEMPLATE_NOTE: Template = {
  name: 'note',
  keys: [
    ['name', { name: 'Name', type: ['text', {}] }],
    ['info', { name: 'Info', type: ['text', {}] }],
    ['tags', { name: 'Tags', type: ['join', { templateId: 'note', on: 'tagged' }] }],
    ['tagged', { name: 'Tagged', type: ['join', { templateId: 'note', on: 'tags' }] }],
  ],
  namePath: 'name',
}
