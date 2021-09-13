import 'easy-peasy/map-set-support'

import { Key, Node, NodeId, Template } from '@brainote/common'
import { Action, action, Computed, computed, Thunk, thunk } from 'easy-peasy'
import { v4 } from 'uuid'

import { Data$get_default } from '../data/data.default'
import { NODES } from './nodes'

type Patch<T extends Node> = Partial<T> | ((node: T) => void)

export interface NodesModel {
  list: Node[]
  keys: Computed<this, Key[]>
  templates: Computed<this, Template[]>

  drafts: Map<NodeId, Node>

  node: Computed<this, (id: NodeId) => Node>
  key: Computed<this, (id: NodeId) => Key>
  template: Computed<this, (id: NodeId) => Template>

  insert: Action<this, Node>
  create: Thunk<this, { name: string }, any, {}, Node>
  update: Action<this, { node_id: NodeId; patch: Patch<Node> }>
  update_template: Thunk<this, { id: NodeId; patch: Patch<Template> }>
  delete: Action<this, { node_id: NodeId }>

  draft_create: Action<this, NodeId>
  draft_update: Action<this, { id: NodeId; data: Partial<Node> }>

  key_attach: Thunk<this, { node_id: NodeId; key_id: NodeId }>
  key_update: Thunk<this, { node_id: NodeId; key_id: NodeId; data: any }>
  key_detach: Thunk<this, { node_id: NodeId; key_id: NodeId }>

  attach: Thunk<this, { node_id: NodeId; template_id: NodeId }>
  detach: Thunk<this, { node_id: NodeId; template_id: NodeId }>
}

export const nodesModel: NodesModel = {
  list: NODES,
  drafts: new Map(),

  keys: computed(state => {
    return state.list.filter(node => {
      return node['root.templates'].includes('key')
    }) as Key[]
  }),
  templates: computed(state => {
    return state.list.filter(node => {
      return node['root.templates'].includes('template')
    }) as Template[]
  }),

  node: computed(state => {
    const nodes = state.list

    return (node_id: NodeId) => {
      return nodes.find(node => {
        return node.id === node_id
      }) as Node
    }
  }),
  template: computed(state => {
    const templates = state.templates

    return (template_id: NodeId) => {
      return templates.find(template => {
        return template.id === template_id
      }) as Template
    }
  }),
  key: computed(state => {
    const keys = state.keys

    return (key_id: NodeId) => {
      return keys.find(key => {
        return key.id === key_id
      }) as Key
    }
  }),

  insert: action((state, node) => {
    state.list.push(node)
  }),
  create: thunk((actions, { name }) => {
    const node: Node = {
      id: v4(),
      'root.name': name,
      'root.info': '',
      'root.templates': [],
    }

    actions.insert(node)

    return node
  }),
  update: action((state, { node_id, patch }) => {
    findAndPatch(state.list, node_id, node => {
      if (typeof patch === 'function') {
        patch(node)
      } else {
        Object.assign(node, patch)
      }
    })
  }),
  update_template: thunk((actions, { id: template_id, patch }) => {
    actions.update({
      node_id: template_id,
      patch: patch as Patch<Node>,
    })
  }),
  delete: action((state, { node_id }) => {
    state.list = state.list.filter(node => node.id !== node_id)
  }),

  draft_create: action((state, id) => {
    if (!state.drafts.has(id)) {
      const node = state.list.find(node => {
        return node.id === id
      })

      if (!node) return

      state.drafts.set(id, node)
    }
  }),
  draft_update: action((state, { data, id }) => {
    const draft = state.drafts.get(id)

    if (draft) {
      state.drafts.set(id, { ...draft, ...data })
    } else {
      const saved = state.list.find(node => {
        return node.id === id
      })

      if (!saved) return

      state.drafts.set(id, { ...saved, ...data })
    }
  }),

  key_attach: thunk((actions, { node_id, key_id }, { getState }) => {
    const key = getState().key(key_id)

    actions.update({
      node_id,
      patch(node) {
        if (!key['key.required']) return

        node[key.id] = node[key.id] ?? Data$get_default(key['key.type'])
      },
    })
  }),
  key_update: thunk((actions, { node_id, key_id, data }, { getState }) => {
    const node = getState().node(node_id)
    const key = getState().key(key_id)

    if (!canUpdateKey(node, key, getState().templates)) return

    const type = key['key.type']

    if (key.id === 'root.templates') {
      const templates = data as NodeId[]
      const nodeTemplates = node['root.templates']

      templates
        .filter(template_id => !nodeTemplates.includes(template_id))
        .forEach(template_id => actions.attach({ node_id, template_id }))
      nodeTemplates
        .filter(template_id => !templates.includes(template_id))
        .forEach(template_id => actions.detach({ node_id, template_id }))
    }

    switch (type.type) {
      case 'join':
        const previous = node[key.id] as NodeId[]
        const next = data as NodeId[]

        actions.update({
          node_id,
          patch(node) {
            node[key.id] = next
          },
        })

        const reflect = type.reflect

        if (!reflect) return

        const added = arrayDiff(next, previous)
        const removed = arrayDiff(previous, next)

        added.forEach(join => {
          const reflected = getState().node(join)
          const reflectedKey = reflected[reflect] as NodeId[]

          if (reflectedKey.includes(node_id)) return

          actions.key_update({
            node_id: reflected.id,
            key_id: reflect,
            data: [...reflectedKey, node_id],
          })

          if (key.id === 'root.templates') {
            actions.attach({
              node_id,
              template_id: reflected.id,
            })
          }
        })

        removed.forEach(join => {
          const reflected = getState().node(join)
          const reflectedKey = reflected[reflect] as NodeId[]

          if (!reflectedKey.includes(node_id)) return

          actions.key_update({
            node_id: reflected.id,
            key_id: reflect,
            data: arrayDiff(reflectedKey, [node_id]),
          })

          if (key.id === 'root.templates') {
            actions.detach({
              node_id,
              template_id: reflected.id,
            })
          }
        })

        break
      default:
        actions.update({
          node_id,
          patch(node) {
            node[key.id] = data
          },
        })
    }
  }),
  key_detach: thunk((actions, { node_id, key_id }, { getState }) => {
    const key = getState().key(key_id)

    actions.update({
      node_id,
      patch(node) {
        delete node[key.id]
      },
    })
  }),

  attach: thunk((actions, { node_id, template_id }, { getState }) => {
    const node = getState().node(node_id)

    const template = getState().template(template_id)
    const templateKeys = template['template.keys'].map(getState().key)

    templateKeys.map(key => {
      if (node[key.id] !== undefined || !key['key.required']) return

      actions.key_attach({
        node_id,
        key_id: key.id,
      })
    })
  }),
  detach: thunk((actions, { node_id, template_id }, { getState }) => {
    const node = getState().node(node_id)
    const template = getState().template(template_id)
    const templates = getState().templates

    if (!canDetachTemplate(node, template, templates)) return

    const nodeTemplatesIds = node['root.templates'].filter(id => {
      return id !== template_id
    })
    const nodeTemplates = nodeTemplatesIds.map(getState().template)
    const nodeKeys = nodeTemplates
      .map(template => template['template.keys'])
      .flat()

    Object.keys(node).forEach(key_id => {
      if (nodeKeys.includes(key_id)) return

      actions.key_detach({
        node_id,
        key_id,
      })
    })
  }),
}

function findAndPatch<T extends { id: Id }, Id>(
  list: T[],
  id: Id,
  patcher: (item: T) => void,
) {
  list.forEach(item => {
    if (item.id === id) {
      patcher(item)
    }
  })
}

/**
 * Return items of left that are not in right
 */
function arrayDiff<T>(left: T[], right: T[]) {
  return left.filter(item => !right.includes(item))
}

/*
Rules
- on detach keep keys ? yes/no
- don't change 'key.type' of used keys
- don't remove template 'key'      from used keys
- don't remove template 'template' from used templates
- don't delete used keys
- don't delete used templates
*/

function canDetachTemplate(
  node: Node,
  template: Template,
  templateList: Template[],
) {
  if (!node['root.templates'].includes(template.id)) return false

  switch (template.id) {
    case 'template':
      return !isTemplate(node) || !isTemplateUsed(node)
    case 'key':
      return !isKey(node) || !isKeyUsed(node, templateList)
    default:
      return true
  }
}
function canUpdateKey(node: Node, key: Key, templateList: Template[]) {
  switch (key.id) {
    case 'key.type':
      console.log('Cannot modify the type of a used key')

      return !isKeyUsed(key, templateList)
    default:
      return true
  }
}

function isTemplateUsed(template: Template) {
  return template['template.data'].length === 0
}
function isKeyUsed(key: Key, templateList: Template[]) {
  return templateList.some(template => {
    return template['template.keys'].includes(key.id)
  })
}

function isKey(node: Node): node is Key {
  return node['root.templates'].includes('key')
}
function isTemplate(node: Node): node is Template {
  return node['root.templates'].includes('template')
}
