import {
  Template,
  TemplateData,
  TemplateDataId,
  TemplateId,
} from '@brainote/common'
import { Action, Computed, ThunkOn } from 'easy-peasy'

import { RootModel } from '../main/root.model'

export type NavOpened = { template_id: TemplateId; data_id: TemplateDataId }
export type NavOpenedJoined = { template: Template; data: TemplateData }

export interface NavModel {
  data: Computed<
    this,
    (template_id: TemplateId, data_id: TemplateDataId) => TemplateData,
    RootModel
  >

  opened: NavOpened[]
  openedJoined: Computed<this, NavOpenedJoined[]>

  open: Action<this, NavOpened>

  close: Action<this, NavOpened>
  closeAll: Action<this>

  onCreate: ThunkOn<this, any, RootModel>
}
