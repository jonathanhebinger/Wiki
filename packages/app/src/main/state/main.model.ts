import { Template, TemplateData } from '@brainote/common'
import { Action, Computed, State, Thunk } from 'easy-peasy'

import {
  DataCreatePayload,
  DataDeletePayload,
  DataInsertPayload,
  DataUpdatePayload,
} from './main.payload'
import { TemplateDataSelector, TemplateSelector } from './main.selector'

export type MainData = {
  [index: string]: TemplateData[]
}

export interface MainModel {
  datas: MainData
  data: Computed<this, TemplateDataSelector>

  templates: Computed<this, Template[]>
  template: Computed<this, TemplateSelector>

  dataCreate: Thunk<this, DataCreatePayload>
  dataInsert: Action<this, DataInsertPayload>
  dataUpdate: Action<this, DataUpdatePayload>
  dataDelete: Action<this, DataDeletePayload>
}

export type MainState = State<MainModel>
