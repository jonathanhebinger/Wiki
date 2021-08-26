import { store } from 'src/features/root/root.store'

export function init() {
  const actions = store.getActions()

  const type = actions.nodes.$create({
    id: 'System:Type',
    name: 'System:Type',
    tags: [],
  })
  actions.nodes.tags$add({ id: type, tag: type })
  actions.nodes.data$set({ id: type, type, data: { type: 'type' } })

  const location = actions.nodes.$create({
    name: 'Location:Type',
    tags: [type],
  })
  actions.nodes.data$set({
    id: location,
    type,
    data: {
      type: 'object',
      keys: [
        { id: 'X', name: 'X', required: true, type: { type: 'number' } },
        { id: 'Y', name: 'Y', required: true, type: { type: 'number' } },
      ],
    },
  })

  const location_demo = actions.nodes.$create({
    name: 'Location:Demo',
    tags: [location],
  })
  actions.nodes.data$set({
    id: location_demo,
    type: location,
    data: { X: 0, Y: 2 },
  })
}

const Node_System = [
  {
    id: 'System:Key',
    tags: ['System:Type'],
    data: {
      'System:Type': { type: 'type' },
    },
  },
  {
    id: 'System:Template',
    tags: ['System:Type'],
    data: {
      'System:Type': {
        type: 'array',
        of: {
          type: 'object',
          keys: [
            {
              id: 'node',
              name: 'node',
              required: true,
              type: { type: 'node' },
            },
            {
              id: 'required',
              name: 'required',
              required: true,
              type: { type: 'number' },
            },
          ],
        },
      },
    },
  },
]
