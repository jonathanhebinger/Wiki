import { Data } from './data'
import { Id } from './id'
import { Type } from './type'

export type TemplateKeyId = Id<'template-key'>
export type TemplateKey = {
  id: TemplateKeyId
  name: string
  info: string
  type: Type.Any
  required: boolean
}

export type TemplateDataId = Id<'template-data'>
export type TemplateData = {
  id: TemplateDataId
  [index: string]: Data.Any
}

export type TemplateId = Id<'template'>
export type Template = {
  id: TemplateId
  name: string
  info: string
  keys: TemplateKey[]
  data: TemplateData[]
  computed: {
    name: TemplateKeyId
  }
}
