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
import { TEMPLATES } from './main.constants'
import { MainModel } from './main.model'

export const mainStore: MainModel = {
  datas: {
    note: [],
    template: TEMPLATES,
  },
  templates: computed(state => {
    return state.datas['template'] as Template[]
  }),

  template: computed(state => {
    const templates = state.templates

    return (templateId: TemplateId) => {
      return templates.find(template => {
        return template.id === templateId
      }) as Template
    }
  }),
  data: computed(state => {
    const datas = state.datas

    return (templateId: TemplateId, dataId: TemplateDataId) => {
      console.log(state.datas)
      return datas[templateId].find(data => {
        return data.id === dataId
      }) as TemplateData
    }
  }),

  dataInsert: action((state, { templateId, data }) => {
    if (templateId === 'template') {
      state.datas[data.id] = []
    }

    state.datas[templateId].push(data)
  }),
  dataCreate: thunk((actions, { templateId }, { getState }) => {
    const data: TemplateData = {
      id: v4(),
    }

    actions.dataInsert({ templateId, data })

    const template = getState().template(templateId)
    const templateKeys = template.keys

    templateKeys.map(key => {
      if (data[key.id] !== undefined || !key.required) return

      data[key.id] = Data$get_default(key.type)
    })

    actions.dataUpdate({
      templateId,
      dataId: data.id,
      patch: data,
    })

    console.log(data)

    return data
  }),
  dataUpdate: action((state, { templateId, dataId, patch }) => {
    findDataAndPatch(state.datas, templateId, dataId, (data, template) => {
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
                findDataAndPatch(state.datas, templateId, join, data => {
                  const keys = data[reflect] as string[]

                  if (!keys.includes(dataId)) return

                  data[reflect] = [...keys, dataId]
                })
              })

              removed.forEach(join => {
                findDataAndPatch(state.datas, templateId, join, data => {
                  const keys = data[reflect] as string[]

                  if (!keys.includes(dataId)) return

                  data[reflect] = arrayDiff(keys, [dataId])
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
  dataDelete: action((state, { templateId, dataId }) => {
    state.datas[templateId] = state.datas[templateId].filter(data => {
      return data.id !== dataId
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
  templateId: TemplateId,
  dataId: TemplateDataId,
  patch:
    | Partial<TemplateData>
    | ((data: TemplateData, template: Template) => void),
) {
  findAndPatch(list['template'], templateId, template =>
    findAndPatch(
      list[templateId],
      dataId,
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
