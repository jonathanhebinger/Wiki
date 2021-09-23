import {
  Template,
  TemplateData,
  TemplateDataId,
  TemplateId,
} from '@brainote/common'

export type TemplateInsertPayload = {
  template: Template
  templateId: TemplateId
}
export type TemplateUpdatePayload = {
  template: Template
  templateId: TemplateId
}
export type TemplateDeletePayload = {
  templateId: TemplateId
}

export type TemplateDataCreatePayload = {
  templateId: TemplateId
}
export type TemplateDataInsertPayload = {
  templateId: TemplateId
  templateData: TemplateData
  templateDataId: TemplateDataId
}
export type TemplateDataUpdatePayload = {
  target: 'draft' | 'saved'
  templateId: TemplateId
  templateData: TemplateData
  templateDataId: TemplateDataId
}
export type TemplateDataDeletePayload = {
  templateId: TemplateId
  templateDataId: TemplateDataId
}
