import { action, computed, thunkOn } from 'easy-peasy'

import { NavModel } from './nav.model'

export const navModel: NavModel = {
  opened: [],

  node: computed([(state, store) => store.main.node], node => {
    return node
  }),
  template: computed([(state, store) => store.main.template], template => {
    return template
  }),
  templateData: computed([(state, store) => store.main.template], template => {
    return template
  }),

  opened_nodes: computed(state => {
    return [...state.opened].reverse().map(opened => {
      switch (opened.type) {
        case 'template':
          return {
            type: 'template',
            template: state.template(opened.template_id),
          }
        case 'data':
          return {
            type: 'template',
            template: state.template(opened.template_id),
            data: state.templateData(opened.template_id, opened.data_id),
          }
      }
    })
  }),

  open_template: action((state, template_id) => {
    state.opened = state.opened.filter(item => {
      return item.type !== 'template' || item.template_id !== template_id
    })
    state.opened.push({ type: 'template', template_id })
  }),
  open_templateData: action((state, { template_id, data_id }) => {
    state.opened = state.opened.filter(item => {
      return (
        item.type !== 'data' ||
        item.template_id !== template_id ||
        item.data_id !== data_id
      )
    })
    state.opened.push({ type: 'template', template_id })
  }),

  close_template: action((state, template_id) => {
    state.opened = state.opened.filter(item => {
      return item.type === 'template' && item.template_id === template_id
    })
  }),
  close_templateData: action((state, { template_id, data_id }) => {
    state.opened = state.opened.filter(item => {
      return (
        item.type === 'data' &&
        item.template_id === template_id &&
        item.data_id === data_id
      )
    })
  }),

  close_all: action(state => {
    state.opened = []
  }),

  on_template_create: thunkOn(
    (_, store) => [store.main.template_create],
    (actions, target) => {
      actions.open_template(target.result.id)
    },
  ),
  on_templateData_create: thunkOn(
    (_, store) => [store.main.templateData_create],
    (actions, target) => {
      actions.open_templateData({
        template_id: target.payload.template_id,
        data_id: target.result.id,
      })
    },
  ),
}
