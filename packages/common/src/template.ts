import { Id } from './id'
import { TemplateData } from './template.data'
import { Type } from './type'

export type TemplateId = Id<'node'>
/**
 * Templates are NOT data, for now, and forever !
 */
export type Template = {
  id: TemplateId
  data: TemplateData[]
} & Omit<Type.Object, 'type'>
