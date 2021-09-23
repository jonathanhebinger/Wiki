import { Template, TemplateData, TemplateDataId, TemplateId } from '@brainote/common'
import { action, thunk } from 'easy-peasy'
import { v4 } from 'uuid'

import { Data$get_default } from '../../data/data.default'
import { ArrayUtil } from '../../util/array'
import { TEMPLATE_NOTE } from './main.constants'
import { MainModel, MainState } from './main.model'

const TEMPLATE: Template = {
  name: 'New Template',
  keys: [['name', { name: 'Name', type: ['text', {}] }]],
  namePath: 'name',
}

export const mainModel: MainModel = {
  templates: [['note', TEMPLATE_NOTE]],
  datas: [['note', []]],

  templateCreate: thunk(actions => {
    const template = TEMPLATE
    const templateId = v4()

    actions.templateInsert({ templateId, template })

    return templateId
  }),
  templateInsert: action((state, { templateId, template }) => {
    state.templates.push([templateId, template])

    state.datas.push([templateId, []])
  }),
  templateUpdate: action((state, { templateId, template }) => {
    const templateSaved = getTemplate(state, templateId)

    const templateKeys = template.keys
    const templateSavedKeys = templateSaved.keys

    Object.assign(templateSaved, template)

    templateSavedKeys.forEach(([keyId, key]) => {
      if (ArrayUtil.getPair(templateKeys, keyId)) return

      ArrayUtil.getPair(state.datas, templateId).map(([, data]) => {
        delete data[keyId]
      })
    })

    templateKeys.forEach(([keyId, key]) => {
      const keySaved = ArrayUtil.getPair(templateSavedKeys, keyId)

      if (!keySaved) return

      if (keySaved.type[0] !== key.type[0]) {
        ArrayUtil.getPair(state.datas, templateId).map(([, data]) => {
          data[keyId] = Data$get_default(key.type)
        })
      }
    })
  }),
  templateDelete: action((state, { templateId }) => {
    state.templates = state.templates.filter(item => {
      return item[0] === templateId
    })
  }),

  templateDataCreate: thunk((actions, { templateId }, { getState }) => {
    const template = getTemplate(getState(), templateId)
    const templateData: TemplateData = {}
    const templateDataId = v4()

    template.keys.map(([keyId, key]) => {
      templateData[keyId] = Data$get_default(key.type)
    })

    actions.templateDataInsert({
      templateId,
      templateData,
      templateDataId,
    })

    return templateDataId
  }),
  templateDataInsert: action((state, { templateId, templateData, templateDataId }) => {
    ArrayUtil.getPair(state.datas, templateId).push([templateDataId, templateData, undefined])
  }),
  templateDataUpdate: action((state, payload) => {
    const { target, templateId, templateData, templateDataId } = payload

    const template = getTemplate(state, templateId)

    const getter = target === 'saved' ? getTemplateDataSaved : getTemplateDataDraft
    const setter = target === 'saved' ? setTemplateDataSaved : setTemplateDataDraft

    const templateDataTarget = getter(state, templateId, templateDataId)

    template.keys.map(([keyId, key]) => {
      const dataUpdate = templateData[keyId]
      const dataTarget = templateDataTarget[keyId]

      if (target === 'saved') {
        switch (key.type[0]) {
          case 'join':
            // TODO - allow join on itself

            const join = key.type[1]
            const joinOn = join.on

            if (joinOn) {
              const joinIdsUpdate = dataUpdate as TemplateDataId[]
              const joinIds = dataTarget as TemplateDataId[]

              const joinIdsCreated = ArrayUtil.diff(joinIdsUpdate, joinIds)
              const joinIdsDeleted = ArrayUtil.diff(joinIds, joinIdsUpdate)

              if (joinIdsCreated.length + joinIdsDeleted.length === 0) return

              joinIdsCreated.map(joinId => {
                const joinedSaved = getTemplateDataSaved(state, join.templateId, joinId)
                const joinedDraft = getTemplateDataDraft(state, join.templateId, joinId)

                const joinedReflectSaved = joinedSaved[joinOn] as TemplateDataId[]
                const joinedReflectDraft = joinedDraft[joinOn] as TemplateDataId[]

                if (!joinedReflectSaved.includes(templateDataId)) {
                  joinedReflectSaved.push(templateDataId)
                }
                if (!joinedReflectDraft.includes(templateDataId)) {
                  joinedReflectDraft.push(templateDataId)
                }
              })

              joinIdsDeleted.map(joinId => {
                const joinedSaved = getTemplateDataSaved(state, join.templateId, joinId)
                const joinedDraft = getTemplateDataDraft(state, join.templateId, joinId)

                const joinedReflectSaved = joinedSaved[joinOn] as TemplateDataId[]
                const joinedReflectDraft = joinedDraft[joinOn] as TemplateDataId[]

                if (joinedReflectSaved.includes(templateDataId)) {
                  joinedSaved[joinOn] = joinedReflectSaved.filter(joinedReflectId => {
                    return joinedReflectId !== templateDataId
                  })
                }
                if (joinedReflectDraft.includes(templateDataId)) {
                  joinedDraft[joinOn] = joinedReflectDraft.filter(joinedReflectId => {
                    return joinedReflectId !== templateDataId
                  })
                }
              })
            }

            break
        }
      }

      templateDataTarget[keyId] = dataUpdate
    })

    setter(state, templateId, templateDataId, templateDataTarget)
  }),
  templateDataDelete: action((state, { templateId, templateDataId }) => {
    const dataList = getTemplateDataList(state, templateId)

    const index = dataList.findIndex(([id]) => {
      return id === templateDataId
    })

    dataList.splice(index, 1)
  }),
}

export function getTemplate(state: MainState, templateId: TemplateId) {
  return ArrayUtil.getPair(state.templates, templateId)
}

export function getTemplateDataList(state: MainState, templateId: TemplateId) {
  return ArrayUtil.getPair(state.datas, templateId)
}

export function getTemplateDataSaved(
  state: MainState,
  templateId: TemplateId,
  templateDataId: TemplateDataId,
) {
  return ArrayUtil.getPair(getTemplateDataList(state, templateId), templateDataId)
}
export function getTemplateDataDraft(
  state: MainState,
  templateId: TemplateId,
  templateDataId: TemplateDataId,
) {
  const templateDataDraft = ArrayUtil.getTrio(
    getTemplateDataList(state, templateId),
    templateDataId,
  )

  if (templateDataDraft) return templateDataDraft

  const templateDataSaved = getTemplateDataSaved(state, templateId, templateDataId)

  return JSON.parse(JSON.stringify(templateDataSaved)) as TemplateData
}

export function setTemplateDataSaved(
  state: MainState,
  templateId: TemplateId,
  templateDataId: TemplateDataId,
  templateData: TemplateData,
) {
  ArrayUtil.setPair(getTemplateDataList(state, templateId), templateDataId, templateData)
}
export function setTemplateDataDraft(
  state: MainState,
  templateId: TemplateId,
  templateDataId: TemplateDataId,
  templateData: TemplateData,
) {
  return ArrayUtil.setTrio(getTemplateDataList(state, templateId), templateDataId, templateData)
}
