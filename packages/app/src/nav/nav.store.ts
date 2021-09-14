import { Template } from '@brainote/common'
import { action, computed, thunkOn } from 'easy-peasy'

import { NavModel } from './nav.model'

export const navModel: NavModel = {
  data: computed([(state, store) => store.main.data], template => {
    return template
  }),

  opened: [],
  openedJoined: computed(state => {
    return [...state.opened].reverse().map(({ template_id, data_id }) => {
      return {
        template: state.data(template_id, 'template') as Template,
        data: state.data(template_id, data_id),
      }
    })
  }),

  open: action((state, { template_id, data_id }) => {
    state.opened = state.opened.filter(item => {
      return item.template_id !== template_id || item.data_id !== data_id
    })
    state.opened.push({ template_id, data_id })
  }),
  close: action((state, { template_id, data_id }) => {
    state.opened = state.opened.filter(item => {
      return item.template_id === template_id && item.data_id === data_id
    })
  }),
  closeAll: action(state => {
    state.opened = []
  }),

  onCreate: thunkOn(
    (_, store) => [store.main.dataCreate],
    (actions, target) => {
      actions.open({
        template_id: target.payload.template_id,
        data_id: target.result.id,
      })
    },
  ),
}
