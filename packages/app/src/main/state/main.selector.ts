import {
  Template,
  TemplateData,
  TemplateDataId,
  TemplateDataTrio,
  TemplateId,
} from '@brainote/common'

import { MainState } from './main.model'
import {
  getTemplate,
  getTemplateDataDraft,
  getTemplateDataList,
  getTemplateDataSaved,
} from './main.store'

export type MainSelector<Result> = (state: MainState) => Result

export function selectTemplateList(state: MainState) {
  return state.templates
}
export function selectTemplate(templateId: TemplateId): MainSelector<Template> {
  return state => getTemplate(state, templateId)
}
export function selectTemplateData(
  templateId: TemplateId,
  templateDataId: TemplateDataId,
): MainSelector<TemplateData> {
  return state => getTemplateDataSaved(state, templateId, templateDataId)
}
export function selectTemplateDataDraft(
  templateId: TemplateId,
  templateDataId: TemplateDataId,
): MainSelector<TemplateData | undefined> {
  return state => getTemplateDataDraft(state, templateId, templateDataId)
}
export function selectTemplateDataList(
  templateId: TemplateId,
): MainSelector<TemplateDataTrio[]> {
  return state => getTemplateDataList(state, templateId)
}
