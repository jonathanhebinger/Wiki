import { Id } from './id'
import { Type } from './type'

/**
 * Templates are NOT data, for now, and forever !
 */
export type Template = Type.ObjectConfig
export type TemplateId = Id<'node'>
export type TemplatePair = [TemplateId, Template]
