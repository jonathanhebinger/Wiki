import 'easy-peasy/map-set-support'

import {
  Node,
  NodeId,
  Template,
  TemplateData,
  TemplateDataId,
  TemplateId,
  TemplateKey,
} from '@brainote/common'
import { action, computed, thunk } from 'easy-peasy'
import { v4 } from 'uuid'

import { Data$get_default } from '../../data/data.default'
import { MainModel } from './main.model'

export const mainStore: MainModel = {
  notes: computed(state => {
    const noteTemplate = state.templates.find(
      template => template.id === 'note',
    ) as Template

    return noteTemplate.data as Node[]
  }),
  templates: [
    {
      id: 'note',
      name: 'note',
      info: '',
      keys: [
        {
          id: 'tags',
          name: 'tags',
          type: { type: 'join', template: 'note', reflect: 'tagged' },
          required: true,
        },
        { id: 'name', name: 'name', type: { type: 'string' }, required: true },
        { id: 'note', name: 'note', type: { type: 'string' }, required: true },
        {
          id: 'tagged',
          name: 'tagged',
          type: { type: 'join', template: 'note', reflect: 'tags' },
          required: true,
        },
      ],
      data: [],
    },
  ],

  node: computed(state => {
    const nodes = state.notes

    return (node_id: NodeId) => {
      return nodes.find(node => {
        return node.id === node_id
      }) as Node
    }
  }),
  template: computed(state => {
    const templates = state.templates

    return (template_id: TemplateId) => {
      return templates.find(template => {
        return template.id === template_id
      }) as Template
    }
  }),
  templateData: computed(state => {
    const template = state.template

    return (template_id: TemplateId, data_id: TemplateDataId) => {
      return template(template_id).data.find(data => {
        return data.id === data_id
      }) as TemplateData
    }
  }),

  template_insert: action((state, template) => {
    state.templates.push(template)
  }),
  template_create: thunk((actions, { name }) => {
    const template: Template = {
      id: v4(),
      name,
      info: '',
      keys: [],
      data: [],
    }

    actions.template_insert(template)

    return template
  }),
  template_update: action((state, { template_id, patch }) => {
    findAndPatch(state.templates, template_id, patch)
  }),
  template_delete: action((state, { template_id }) => {
    state.templates = state.templates.filter(
      template => template.id !== template_id,
    )
  }),

  templateData_insert: action((state, { template_id, data }) => {
    findAndPatch(state.templates, template_id, template => {
      template.data.push(data)
    })
  }),
  templateData_create: thunk((actions, { template_id }, { getState }) => {
    const data: TemplateData = {
      id: v4(),
      data: {},
    }

    actions.templateData_insert({ template_id, data })

    const template = getState().template(template_id)
    const templateKeys = template.keys

    templateKeys.map(key => {
      if (data[key.id] !== undefined || !key.required) return

      data[key.id] = Data$get_default(key.type)

      actions.templateData_update({
        template_id,
        data_id: data.id,
        patch: {
          [key.id]: data[key.id],
        },
      })
    })

    return data
  }),
  templateData_update: action((state, { template_id, data_id, patch }) => {
    findDataAndPatch(
      state.templates,
      template_id,
      data_id,
      (data, template) => {
        Object.keys(patch)
          .map(key_id => {
            return template.keys.find(key => key.id === key_id) as TemplateKey
          })
          .forEach(key => {
            const type = key.type

            switch (type.type) {
              case 'join': {
                const previous = data[key.id] as TemplateDataId[]
                const next = patch[key.id] as TemplateDataId[]

                data[key.id] = next

                const reflect = type.reflect

                if (!reflect) return

                const added = arrayDiff(next, previous)
                const removed = arrayDiff(previous, next)

                added.forEach(join => {
                  findDataAndPatch(state.templates, template_id, join, data => {
                    const keys = data[reflect] as string[]

                    if (!keys.includes(data_id)) return

                    data[reflect] = [...keys, data_id]
                  })
                })

                removed.forEach(join => {
                  findDataAndPatch(state.templates, template_id, join, data => {
                    const keys = data[reflect] as string[]

                    if (!keys.includes(data_id)) return

                    data[reflect] = arrayDiff(keys, [data_id])
                  })
                })

                break
              }
              default: {
                const next = patch[key.id]

                data[key.id] = next
              }
            }
          })
      },
    )
  }),
  templateData_delete: action((state, { template_id }) => {
    state.templates = state.templates.filter(
      template => template.id !== template_id,
    )
  }),

  attach: action((state, { node_id, template_id, data_id }) => {
    findAndPatch(state.notes, node_id, node => {
      const alreadyIn = node.data.find(item => {
        return item.template_id !== template_id && item.data_id !== data_id
      })

      if (alreadyIn) return

      node.data.push({ template_id, data_id })
    })
  }),
  detach: action((state, { node_id, template_id, data_id }) => {
    findAndPatch(state.notes, node_id, node => {
      node.data = node.data.filter(item => {
        return item.template_id !== template_id && item.data_id !== data_id
      })
    })
  }),
}

function findAndPatch<T extends { id: Id }, Id>(
  list: T[],
  id: Id,
  patch: Partial<T> | ((item: T) => void),
) {
  list.forEach(item => {
    if (item.id === id) {
      if (typeof patch === 'function') {
        patch(item)
      } else {
        Object.assign(item, patch)
      }
    }
  })
}
function findDataAndPatch<T extends Template, Id>(
  list: T[],
  template_id: TemplateId,
  data_id: TemplateDataId,
  patch:
    | Partial<TemplateData>
    | ((data: TemplateData, template: Template) => void),
) {
  findAndPatch(list, template_id, template =>
    findAndPatch(
      template.data,
      data_id,
      typeof patch === 'function' ? data => patch(data, template) : patch,
    ),
  )
}

/**
 * Return items of left that are not in right
 */
function arrayDiff<T>(left: T[], right: T[]) {
  return left.filter(item => !right.includes(item))
}
