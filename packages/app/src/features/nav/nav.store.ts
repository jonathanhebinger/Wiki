import constate from 'constate'
import { useObserve, useSystem } from 'src/bang/hooks/system'
import { Template } from 'src/types/template'

import { useTemplatesContext } from '../templates/templates.store'
import { NavRef, NavRefPayload } from './nav.model'

export const [NavContextProvider, useNavContext] = constate(() => {
  const [, , templateRefs] = useTemplatesContext()

  const tuple = useSystem({
    opened: [] as NavRef[],
    templates: templateRefs.map,

    get opened_nodes() {
      return [...this.opened]
        .reverse()
        .map(({ collapsed, ...info }: NavRef): any => {
          switch (info.type) {
            case 'template': {
              const template = this.templates[info.template] as Template

              return {
                type: info.type,
                collapsed,
                template,
                name: template.name,
              }
            }
            case 'data': {
              const template = this.templates[info.template] as Template

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

    open(info: NavRefPayload) {
      this.opened = this.opened.filter(item => {
        return !info$test_equality(item, info)
      })
      this.opened.push({ ...info, collapsed: false } as any)
    },
    close(info: NavRefPayload) {
      this.opened = this.opened.filter(v => {
        return !info$test_equality(v, info)
      })
    },
    close_all() {
      this.opened = []
    },
  })

  const [, actions] = tuple

  useObserve(templateRefs.create, ({ result }) => {
    actions.open({
      type: 'template',
      template: result.id,
    })
  })
  useObserve(templateRefs.data_create, ({ args: [template_id], result }) => {
    actions.open({
      type: 'data',
      template: template_id,
      data: result.id,
    })
  })

  return tuple
})

function info$test_equality(a: NavRef, b: NavRefPayload) {
  if (a.type === 'template' && b.type === 'template') {
    return a.template === b.template
  }

  if (a.type === 'data' && b.type === 'data') {
    return a.template === b.template && a.data === b.data
  }

  return false
}
