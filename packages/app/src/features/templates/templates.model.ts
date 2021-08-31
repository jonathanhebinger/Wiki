import { Thunk } from 'easy-peasy'
import { CrudRepository } from 'src/repository'
import { Template, TemplateData, TemplateDataId, TemplateId } from 'src/types/template'

type MyThunk<
  P = undefined,
  R = void,
  S extends object = {},
  I = any,
  M extends object = TemplatesModel,
> = Thunk<M, P, I, S, R>

export type TemplateDataCreatePayload = { template_id: TemplateId }
export type TemplateDataUpdatePayload = {
  template_id: TemplateId
  data: TemplateData
}
export type TemplateDataDeletePayload = {
  template_id: TemplateId
  data_id: TemplateDataId
}

export interface TemplatesModel extends CrudRepository<Template, TemplateId> {
  $create: MyThunk<string, Template>
  $update: MyThunk<Template, Template>
  $delete: MyThunk<TemplateId>

  data$create: MyThunk<TemplateDataCreatePayload, TemplateData>
  data$update: MyThunk<TemplateDataUpdatePayload, TemplateData>
  data$delete: MyThunk<TemplateDataDeletePayload>
}
