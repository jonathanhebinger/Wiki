import { action, computed, thunkOn } from 'easy-peasy'
import { Template } from 'src/types/template'

import { NavModel, NavRef, NavRefJoined, NavRefPayload } from './nav.model'

export const navModel: NavModel = {
  opened: [],
  opened_nodes: computed(
    [
      (state, _store) => state.opened,
      (_state, store) => store.templates.dictionnary,
    ],
    (infos, templates) => {
      return [...infos]
        .reverse()
        .map<NavRefJoined>(({ collapsed, ...info }): any => {
          switch (info.type) {
            case 'template': {
              const template = templates[info.template] as Template

              return {
                type: info.type,
                collapsed,
                template,
                name: template.name,
              }
            }
            case 'data': {
              const template = templates[info.template] as Template

              const data = template.data.find(item => {
                return item.id === info.data
              })

              return {
                type: info.type,
                collapsed,
                template,
                data,
                name: template.name,
              }
            }
            default:
              throw new Error()
          }
        })
    },
  ),

  $open: action((state, info) => {
    state.opened = state.opened.filter(item => {
      return !info$test_equality(item, info)
    })
    state.opened.push({ ...info, collapsed: false } as any)
  }),
  $close: action((state, info) => {
    state.opened = state.opened.filter(v => {
      return !info$test_equality(v, info)
    })
  }),
  $close_all: action(state => {
    state.opened = []
  }),

  on_templates$create: thunkOn(
    (state, store) => store.templates.$create,
    (actions, target) => {
      actions.$open({
        type: 'template',
        template: target.result.id,
      })
    },
  ),
  on_templatesData$create: thunkOn(
    (state, store) => store.templates.data$create,
    (actions, target) => {
      actions.$open({
        type: 'data',
        template: target.payload.templateId,
        data: target.result.id,
      })
    },
  ),
}

function info$test_equality(a: NavRef, b: NavRefPayload) {
  if (a.type === 'template' && b.type === 'template') {
    return a.template === b.template
  }

  if (a.type === 'data' && b.type === 'data') {
    return a.template === b.template && a.data === b.data
  }

  return false
}
