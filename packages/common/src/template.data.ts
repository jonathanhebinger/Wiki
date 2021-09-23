import { Data } from '.'
import { Id } from './id'

export type TemplateDataId = Id<'node'>
export type TemplateData = {
  id: TemplateDataId
} & Data.Object
