import { Template, TemplateData, TemplateDataId, TemplateId } from '@brainote/domain'
import { Action, Computed, ThunkOn } from 'easy-peasy'

import { RootModel } from '../../main/root.model'

export type NavOpenedTemplate = { type: 'template'; templateId: TemplateId }
export type NavOpenedTemplateData = {
  type: 'data'
  templateId: TemplateId
  templateDataId: TemplateDataId
}

export type NavOpened = NavOpenedTemplate | NavOpenedTemplateData
export type NavOpenedJoined =
  | { type: 'template'; template: Template; templateId: TemplateId }
  | {
      type: 'data'
      template: Template
      templateId: TemplateId
      templateData: TemplateData
      templateDataId: TemplateDataId
    }

export interface NavModel {
  template: Computed<this, (templateId: TemplateId) => Template, RootModel>
  templateData: Computed<
    this,
    (templateId: TemplateId, dataId: TemplateDataId) => TemplateData,
    RootModel
  >

  opened: NavOpened[]
  openedJoined: Computed<this, NavOpenedJoined[]>

  open: Action<this, NavOpened>

  close: Action<this, NavOpened>
  closeAll: Action<this>

  onTemplateCreate: ThunkOn<this, any, RootModel>
  onTemplateDataCreate: ThunkOn<this, any, RootModel>
}
