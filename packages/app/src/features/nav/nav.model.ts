import { Action, action, Computed, computed, ThunkOn, thunkOn } from 'easy-peasy'
import { Injections, RootModel } from 'src/features/root/root.model'
import { Node, NodeId } from 'src/types/node'
import { Template, TemplateData, TemplateDataId, TemplateId } from 'src/types/template'

type Ref = RefPayload & {
  collapsed: boolean
}
type RefPayload =
  | { type: 'node'; node: NodeId }
  | { type: 'template'; template: TemplateId }
  | { type: 'data'; template: TemplateId; data: TemplateDataId }
type RefJoined = { collapsed: boolean; name: string } & (
  | { type: 'node'; node: Node }
  | { type: 'template'; template: Template }
  | { type: 'data'; template: Template; data: TemplateData }
)

export interface NavModel {
  opened: Ref[]
  opened_nodes: Computed<NavModel, RefJoined[], RootModel>

  $open: Action<NavModel, RefPayload>
  $close: Action<NavModel, RefPayload>
  $close_all: Action<NavModel>

  on_nodes$create: ThunkOn<NavModel, Injections, RootModel>
  on_templates$create: ThunkOn<NavModel, Injections, RootModel>
}

export const navModel: NavModel = {
  opened: [],
  opened_nodes: computed(
    [
      (state, _store) => state.opened,
      (_state, store) => store.nodes.dictionnary,
      (_state, store) => store.templates.dictionnary,
    ],
    (infos, nodes, templates) => {
      return [...infos]
        .reverse()
        .map<RefJoined>(({ collapsed, ...info }): any => {
          switch (info.type) {
            case 'node':
              const node = nodes[info.node] as Node
              return {
                type: info.type,
                collapsed,
                node,
                name: node.name,
              }
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
      return info$test_equality(item, info)
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

  on_nodes$create: thunkOn(
    (state, store) => store.nodes.$create,
    (actions, target) => {
      actions.$open({
        type: 'node',
        node: target.result,
      })
    },
  ),
  on_templates$create: thunkOn(
    (state, store) => store.templates.$create,
    (actions, target) => {
      actions.$open({
        type: 'template',
        template: target.result.id,
      })
    },
  ),
}

function info$test_equality(a: Ref, b: RefPayload) {
  return Object.keys(b).every(key => (a as any)[key] === (b as any)[key])
}
