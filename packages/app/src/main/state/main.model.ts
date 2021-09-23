import { Template, TemplateData, TemplateId } from '@brainote/common'
import { Action, State, Thunk } from 'easy-peasy'

import {
  TemplateDataCreatePayload,
  TemplateDataDeletePayload,
  TemplateDataInsertPayload,
  TemplateDataUpdatePayload,
} from './main.payload'

export type MyThunk<
  Model extends object,
  Payload = undefined,
  Result = any,
> = Thunk<Model, Payload, any, {}, Result>

export type MainThunk<P = undefined, R = void> = MyThunk<MainModel, P, R>

export type MainModel = {
  templates: Template[]

  templateCreate: MainThunk<void, Template>
  templateInsert: Action<MainModel, Template>
  templateUpdate: Action<MainModel, Template>
  templateDelete: Action<MainModel, TemplateId>

  templateDataCreate: MainThunk<TemplateDataCreatePayload, TemplateData>
  templateDataInsert: Action<MainModel, TemplateDataInsertPayload>
  templateDataUpdate: Action<MainModel, TemplateDataUpdatePayload>
  templateDataDelete: Action<MainModel, TemplateDataDeletePayload>
}
export type MainState = State<MainModel>
