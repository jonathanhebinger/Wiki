import { Node, Template } from '@brainote/common'
import { Action, Computed, State, Thunk } from 'easy-peasy'

import {
  DataAttachPayload,
  DataCreatePayload,
  DataDeletePayload,
  DataDetachPayload,
  DataInsertPayload,
  DataUpdatePayload,
  TemplateCreatePayload,
  TemplateDeletePayload,
  TemplateUpdatePayload,
} from './main.payload'
import {
  NodeSelector,
  TemplateDataSelector,
  TemplateSelector,
} from './main.selector'

export interface MainModel {
  templates: Template[]
  notes: Computed<this, Node[]>

  node: Computed<this, NodeSelector>
  template: Computed<this, TemplateSelector>
  templateData: Computed<this, TemplateDataSelector>

  template_create: Thunk<this, TemplateCreatePayload, any, {}, Template>
  template_insert: Action<this, Template>
  template_update: Action<this, TemplateUpdatePayload>
  template_delete: Action<this, TemplateDeletePayload>

  templateData_create: Thunk<this, DataCreatePayload>
  templateData_insert: Action<this, DataInsertPayload>
  templateData_update: Action<this, DataUpdatePayload>
  templateData_delete: Action<this, DataDeletePayload>

  attach: Action<this, DataAttachPayload>
  detach: Action<this, DataDetachPayload>
}

export type MainState = State<MainModel>
