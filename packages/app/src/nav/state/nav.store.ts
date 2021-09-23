import { action, computed, thunkOn } from 'easy-peasy'

import {
  selectTemplate,
  selectTemplateData,
} from '../../main/state/main.selector'
import { NavModel, NavOpened } from './nav.model'

export const navModel: NavModel = {
  template: computed([(state, store) => store.main], main => {
    return templateId => selectTemplate(templateId)(main)
  }),
  templateData: computed([(state, store) => store.main], main => {
    return (templateId, templateDataId) =>
      selectTemplateData(templateId, templateDataId)(main)
  }),

  opened: [],
  openedJoined: computed(state => {
    return [...state.opened].reverse().map(item => {
      const template = state.template(item.templateId)

      switch (item.type) {
        case 'template':
          return {
            type: item.type,
            template,
          }
        case 'data':
          return {
            type: item.type,
            template,
            templateData: state.templateData(
              item.templateId,
              item.templateDataId,
            ),
          }
      }
    })
  }),

  open: action((state, payload) => {
    state.opened = state.opened.filter(item => diffTest(payload, item))
    state.opened.push(payload)
  }),
  close: action((state, payload) => {
    state.opened = state.opened.filter(item => diffTest(payload, item))
  }),
  closeAll: action(state => {
    state.opened = []
  }),

  onTemplateCreate: thunkOn(
    (_, store) => [store.main.templateCreate],
    (actions, target) => {
      actions.open({
        type: 'template',
        templateId: target.result.id,
      })
    },
  ),
  onTemplateDataCreate: thunkOn(
    (_, store) => [store.main.templateDataCreate],
    (actions, target) => {
      actions.open({
        type: 'data',
        templateId: target.payload.templateId,
        templateDataId: target.result.id,
      })
    },
  ),
}

function diffTest(payload: NavOpened, item: NavOpened) {
  switch (payload.type) {
    case 'template':
      return item.type !== 'template' || item.templateId !== payload.templateId
    case 'data':
      return (
        item.type !== 'data' ||
        (item.templateId !== payload.templateId &&
          item.templateDataId !== payload.templateDataId)
      )
  }
}
