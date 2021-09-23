import { Data } from './data'
import { Id } from './id'

export type TemplateData = Data.Object
export type TemplateDataId = Id<'node'>
export type TemplateDataPair = [TemplateDataId, TemplateData]
export type TemplateDataTrio = [
  TemplateDataId,
  TemplateData,
  TemplateData | undefined,
]
