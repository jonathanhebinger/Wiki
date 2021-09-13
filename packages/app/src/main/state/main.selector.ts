import {
  Node,
  NodeId,
  Template,
  TemplateData,
  TemplateDataId,
  TemplateId,
} from '@brainote/common'

import { MainState } from './main.model'

type Selector<State extends {}, Result> = (state: State) => Result

export const nodeSelector = (node_id: NodeId): Selector<MainState, Node> => {
  return state => {
    return state.notes.find(node => {
      return node.id === node_id
    }) as Node
  }
}
export const templateSelector = (
  template_id: TemplateId,
): Selector<MainState, Template> => {
  return state => {
    return state.templates.find(template => {
      return template.id === template_id
    }) as Template
  }
}

export type NodeSelector = (node_id: NodeId) => Node
export type TemplateSelector = (template_id: TemplateId) => Template
export type TemplateDataSelector = (
  template_id: TemplateId,
  data_id: TemplateDataId,
) => TemplateData
