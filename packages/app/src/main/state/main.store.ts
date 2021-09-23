import {
  Template,
  TemplateData,
  TemplateDataId,
  TemplateId,
} from '@brainote/common'
import { action, thunk } from 'easy-peasy'
import { v4 } from 'uuid'

import { Data$get_default } from '../../data/data.default'
import { ArrayUtil } from '../../util/array'
import { TEMPLATES } from './main.constants'
import { MainModel } from './main.model'

export const mainModel: MainModel = {
  templates: TEMPLATES,

  templateCreate: thunk(actions => {
    const template: Template = {
      id: v4(),
      name: 'New Template',
      keys: [['name', { name: 'Name', type: { type: 'string' } }]],
      namePath: 'name',
      data: [],
    }

    actions.templateInsert(template)

    return template
  }),
  templateInsert: action((state, template) => {
    state.templates.push(template)
  }),
  templateUpdate: action((state, template) => {
    const templateId = template.id
    const templateSaved = selectTemplate(state, templateId)

    const templateKeys = template.keys
    const templateSavedKeys = templateSaved.keys

    Object.assign(templateSaved, template)

    templateSavedKeys.forEach(([keyId, key]) => {
      if (ArrayUtil.findTuple(templateKeys, keyId)) return

      templateSaved.data.map(data => {
        delete data[keyId]
      })
    })

    templateKeys.forEach(([keyId, key]) => {
      const keySaved = ArrayUtil.findTuple(templateSavedKeys, keyId)

      if (!keySaved) return

      if (keySaved.type.type !== key.type.type) {
        templateSaved.data.forEach(data => {
          data[keyId] = Data$get_default(key.type)
        })
      }
    })
  }),
  templateDelete: action((state, templateId) => {
    state.templates = state.templates.filter(template => {
      return template.id === templateId
    })
  }),

  templateDataCreate: thunk((actions, { templateId }, { getState }) => {
    const templateData: TemplateData = { id: v4() }

    actions.templateDataInsert({
      templateId,
      templateData,
    })

    const template = selectTemplate(getState(), templateId)

    template.keys.map(([keyId, key]) => {
      templateData[keyId] = Data$get_default(key.type)
    })

    actions.templateDataUpdate({
      templateId,
      templateData,
    })

    return templateData
  }),
  templateDataInsert: action((state, { templateId, templateData }) => {
    const template = selectTemplate(state, templateId)

    template.data.push(templateData)
  }),
  templateDataUpdate: action((state, payload) => {
    const { templateId, templateData } = payload

    const template = selectTemplate(state, templateId)

    const templateDataId = templateData.id
    const templateDataSaved = ArrayUtil.findById(template.data, templateDataId)

    template.keys.map(([keyId, key]) => {
      const dataUpdate = templateData[keyId]
      const data = templateDataSaved[keyId]

      switch (key.type.type) {
        case 'join':
          const join = key.type
          const joinOn = join.on

          if (joinOn) {
            const joinIdsUpdate = dataUpdate as TemplateDataId[]
            const joinIds = data as TemplateDataId[]

            const joinIdsCreated = ArrayUtil.diff(joinIdsUpdate, joinIds)
            const joinIdsDeleted = ArrayUtil.diff(joinIds, joinIdsUpdate)

            if (joinIdsCreated.length + joinIdsDeleted.length === 0) return

            const joinTemplate = selectTemplate(state, join.template)

            joinIdsCreated.map(joinId => {
              const joined = ArrayUtil.findById(joinTemplate.data, joinId)
              const joinedReflect = joined[joinOn] as TemplateDataId[]

              if (joinedReflect.includes(templateDataId)) return

              joinedReflect.push(templateDataId)
            })

            joinIdsDeleted.map(joinId => {
              const joined = ArrayUtil.findById(joinTemplate.data, joinId)
              const joinedReflect = joined[joinOn] as TemplateDataId[]

              if (!joinedReflect.includes(templateDataId)) return

              joined[joinOn] = joinedReflect.filter(joinedReflectId => {
                return joinedReflectId !== templateDataId
              })
            })
          }

          break
      }
      templateDataSaved[keyId] = dataUpdate
    })
  }),
  templateDataDelete: action((state, { templateId, templateDataId }) => {
    const template = selectTemplate(state, templateId)

    template.data = template.data.filter(templateData => {
      return templateData.id === templateDataId
    })
  }),
}

function selectTemplate(
  state: { templates: Template[] },
  templateId: TemplateId,
) {
  return ArrayUtil.findById(state.templates, templateId)
}
