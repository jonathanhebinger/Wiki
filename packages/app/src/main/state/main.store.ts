import 'easy-peasy/map-set-support'

import {
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

const TEMPLATE_NOTE: Template = {
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
const TEMPLATE_TEMPLATE: Template = {
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

export const mainStore: MainModel = {
  datas: {
    note: [],
    template: [TEMPLATE_NOTE, TEMPLATE_TEMPLATE],
  },
  templates: computed(state => {
    return state.datas['template'] as Template[]
  }),

  template: computed(state => {
    const templates = state.templates

    return (template_id: TemplateId) => {
      return templates.find(template => {
        return template.id === template_id
      }) as Template
    }
  }),
  data: computed(state => {
    const datas = state.datas

    return (template_id: TemplateId, data_id: TemplateDataId) => {
      return datas[template_id].find(data => {
        return data.id === data_id
      }) as TemplateData
    }
  }),

  dataInsert: action((state, { template_id, data }) => {
    if (template_id === 'template') {
      state.datas[data.id] = []
    }

    state.datas[template_id].push(data)
  }),
  dataCreate: thunk((actions, { template_id }, { getState }) => {
    const data: TemplateData = {
      id: v4(),
    }

    actions.dataInsert({ template_id, data })

    const template = getState().template(template_id)
    const templateKeys = template.keys

    templateKeys.map(key => {
      if (data[key.id] !== undefined || !key.required) return

      data[key.id] = Data$get_default(key.type)
    })

    actions.dataUpdate({
      template_id,
      data_id: data.id,
      patch: data,
    })

    return data
  }),
  dataUpdate: action((state, { template_id, data_id, patch }) => {
    findDataAndPatch(state.datas, template_id, data_id, (data, template) => {
      Object.keys(patch)
        .map(key_id => {
          return template.keys.find(key => key.id === key_id) as TemplateKey
        })
        .filter(key => key)
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
                findDataAndPatch(state.datas, template_id, join, data => {
                  const keys = data[reflect] as string[]

                  if (!keys.includes(data_id)) return

                  data[reflect] = [...keys, data_id]
                })
              })

              removed.forEach(join => {
                findDataAndPatch(state.datas, template_id, join, data => {
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
    })
  }),
  dataDelete: action((state, { template_id, data_id }) => {
    state.datas[template_id] = state.datas[template_id].filter(data => {
      return data.id !== data_id
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
function findDataAndPatch(
  list: { [index: string]: TemplateData[] },
  template_id: TemplateId,
  data_id: TemplateDataId,
  patch:
    | Partial<TemplateData>
    | ((data: TemplateData, template: Template) => void),
) {
  findAndPatch(list['template'], template_id, template =>
    findAndPatch(
      list[template_id],
      data_id,
      typeof patch === 'function'
        ? data => patch(data, template as Template)
        : patch,
    ),
  )
}

/**
 * Return items of left that are not in right
 */
function arrayDiff<T>(left: T[], right: T[]) {
  return left.filter(item => !right.includes(item))
}
