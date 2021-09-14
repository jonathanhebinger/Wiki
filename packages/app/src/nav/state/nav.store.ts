import { Template } from '@brainote/common'
import { action, computed, thunkOn } from 'easy-peasy'

import { NavModel } from './nav.model'

export const navModel: NavModel = {
  data: computed([(state, store) => store.main.data], template => {
    return template
  }),

  opened: [],
  openedJoined: computed(state => {
    return [...state.opened].reverse().map(({ templateId, dataId }) => {
      return {
        template: state.data('template', templateId) as Template,
        data: state.data(templateId, dataId),
      }
    })
  }),

  open: action((state, { templateId, dataId }) => {
    state.opened = state.opened.filter(item => {
      return item.templateId !== templateId || item.dataId !== dataId
    })
    state.opened.push({ templateId, dataId })
  }),
  close: action((state, { templateId, dataId }) => {
    state.opened = state.opened.filter(item => {
      return item.templateId === templateId && item.dataId === dataId
    })
  }),
  closeAll: action(state => {
    state.opened = []
  }),

  onCreate: thunkOn(
    (_, store) => [store.main.dataCreate],
    (actions, target) => {
      actions.open({
        templateId: target.payload.templateId,
        dataId: target.result.id,
      })
    },
  ),
}
