import {
  Node,
  NodeId,
  Template,
  TemplateData,
  TemplateDataId,
  TemplateId,
} from '@brainote/common'
import { Action, Computed, ThunkOn } from 'easy-peasy'

import { RootModel } from '../main/root.model'

type NavOpened =
  | { type: 'template'; template_id: TemplateId }
  | { type: 'data'; template_id: TemplateId; data_id: TemplateDataId }
type NavOpenedJoined =
  | { type: 'template'; template: Template }
  | { type: 'data'; template: Template; data: TemplateData }

export interface NavModel {
  opened: NavOpened[]

  node: Computed<this, (id: NodeId) => Node, RootModel>
  template: Computed<this, (id: TemplateId) => Template, RootModel>
  templateData: Computed<
    this,
    (template_id: TemplateId, data_id: TemplateDataId) => Template,
    RootModel
  >

  opened_nodes: Computed<this, NavOpenedJoined[]>

  open_template: Action<this, TemplateId>
  open_templateData: Action<
    this,
    { template_id: TemplateId; data_id: TemplateDataId }
  >

  close_template: Action<this, TemplateId>
  close_templateData: Action<
    this,
    { template_id: TemplateId; data_id: TemplateDataId }
  >

  close_all: Action<this>

  on_templateData_create: ThunkOn<this, any, RootModel>
  on_template_create: ThunkOn<this, any, RootModel>
}
