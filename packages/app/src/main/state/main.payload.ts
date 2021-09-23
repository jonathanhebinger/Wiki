import { TemplateData, TemplateDataId, TemplateId } from '@brainote/common'

export type TemplateDataCreatePayload = {
  templateId: TemplateId
}
export type TemplateDataInsertPayload = {
  templateId: TemplateId
  templateData: TemplateData
}
export type TemplateDataUpdatePayload = {
  templateId: TemplateId
  templateData: TemplateData
}
export type TemplateDataDeletePayload = {
  templateId: TemplateId
  templateDataId: TemplateDataId
}
