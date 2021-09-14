import { Template } from '@brainote/common'

export const TEMPLATE_NOTE: Template = {
  id: 'note',
  name: 'note',
  info: '',
  keys: [
    {
      id: 'tags',
      name: 'Tags',
      type: { type: 'join', template: 'note', reflect: 'tagged' },
      required: true,
    },
    { id: 'name', name: 'Name', type: { type: 'string' }, required: true },
    { id: 'note', name: 'Note', type: { type: 'string' }, required: true },
    {
      id: 'tagged',
      name: 'Tagged',
      type: { type: 'join', template: 'note', reflect: 'tags' },
      required: true,
    },
  ],
}
export const TEMPLATE_TEMPLATE: Template = {
  id: 'template',
  name: 'template',
  info: '',
  keys: [
    { id: 'name', name: 'name', type: { type: 'string' }, required: true },
    { id: 'info', name: 'Info', type: { type: 'string' }, required: true },
    {
      id: 'keys',
      name: 'Keys',
      type: {
        type: 'array',
        of: {
          type: 'object',
          keys: [
            { id: 'id', name: 'Id', type: { type: 'uuid' } },
            { id: 'name', name: 'Name', type: { type: 'string' } },
            { id: 'type', name: 'Type', type: { type: 'type' } },
            { id: 'required', name: 'Required', type: { type: 'boolean' } },
          ],
        },
        name: ['name'],
      },
      required: true,
    },
  ],
}

export const TEMPLATES = [TEMPLATE_TEMPLATE, TEMPLATE_NOTE]
