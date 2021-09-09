import { Node, Template } from '@brainote/common'
import constate from 'constate'
import { useObserve, useSystem } from 'src/bang/hooks/system'

import { nodes } from '../nodes/nodes.system'
import { NavRef, NavRefJoined, NavRefPayload } from './nav.model'

export const [NavContextProvider, useNavContext] = constate(() => {
  const tuple = useSystem(() => ({
    opened: [] as NavRef[],
    template: nodes.$$.template,
    node: nodes.$$.node,

    get opened_nodes(): NavRefJoined[] {
      return [...this.opened]
        .reverse()
        .map(({ collapsed, ...info }: NavRef): any => {
          const type = info.type

          switch (info.type) {
            case 'template': {
              const template = this.template(info.template) as Template

              return {
                type,
                collapsed,
                template,
                name: template.name,
              }
            }
            case 'data': {
              const template = this.template(info.template) as Template
              const node = this.node(info.node) as Node

              return {
                type,
                collapsed,
                template,
                node,
                name: template.name,
              }
            }
            case 'node': {
              const node = this.node(info.node) as Node

              return {
                type,
                collapsed,
                node,
                name: node.name,
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
  }))

  const [, actions] = tuple

  useObserve(nodes.$$.create, ({ result }) => {
    actions.open({
      type: 'node',
      node: result.id,
    })
  })
  useObserve(nodes.$$.attach, ({ args: [node, template] }) => {
    if (template === 'template') {
      actions.open({
        type: 'template',
        template: node,
      })
    } else {
      actions.open({
        type: 'data',
        template,
        node,
      })
    }
  })

  return tuple
})

function info$test_equality(a: NavRef, b: NavRefPayload) {
  if (a.type === 'node' && b.type === 'node') {
    return a.node === b.node
  }

  if (a.type === 'template' && b.type === 'template') {
    return a.template === b.template
  }

  if (a.type === 'data' && b.type === 'data') {
    return a.template === b.template && a.node === b.node
  }

  return false
}
