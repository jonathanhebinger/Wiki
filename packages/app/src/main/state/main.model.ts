import {
  TemplateDataId,
  TemplateDataTrio,
  TemplateId,
  TemplatePair,
} from '@brainote/common'
import { Action, State, Thunk } from 'easy-peasy'

import {
  TemplateDataCreatePayload,
  TemplateDataDeletePayload,
  TemplateDataInsertPayload,
  TemplateDataUpdatePayload,
  TemplateDeletePayload,
  TemplateInsertPayload,
  TemplateUpdatePayload,
} from './main.payload'

export type MyThunk<
  Model extends object,
  Payload = undefined,
  Result = any,
> = Thunk<Model, Payload, any, {}, Result>

export type MainThunk<P = undefined, R = void> = MyThunk<MainModel, P, R>

export type MainModel = {
  templates: TemplatePair[]
  datas: [TemplateId, TemplateDataTrio[]][]

  templateCreate: MainThunk<void, TemplateId>
  templateInsert: Action<MainModel, TemplateInsertPayload>
  templateUpdate: Action<MainModel, TemplateUpdatePayload>
  templateDelete: Action<MainModel, TemplateDeletePayload>

  templateDataCreate: MainThunk<TemplateDataCreatePayload, TemplateDataId>
  templateDataInsert: Action<MainModel, TemplateDataInsertPayload>
  templateDataUpdate: Action<MainModel, TemplateDataUpdatePayload>
  templateDataDelete: Action<MainModel, TemplateDataDeletePayload>
}
export type MainState = State<MainModel>
