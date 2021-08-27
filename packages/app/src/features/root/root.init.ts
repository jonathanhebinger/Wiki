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
        { id: 'X', name: 'X', type: { type: 'number' } },
        { id: 'Y', name: 'Y', type: { type: 'number' } },
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

  const template = actions.nodes.$create({
    name: 'System:Template',
    tags: [type],
  })
  actions.nodes.data$set({
    id: template,
    type: type,
    data: {
      type: 'array',
      of: {
        type: 'object',
        keys: [
          {
            id: 'node',
            name: 'node',
            type: { type: 'node' },
          },
          {
            id: 'required',
            name: 'required',
            type: { type: 'boolean' },
          },
        ],
      },
    },
  })

  const template_demo = actions.nodes.$create({
    name: 'Template:Demo',
    tags: [template],
  })
  actions.nodes.data$set({
    id: template_demo,
    type: template,
    data: [],
  })
}
