import {
  Template,
  TemplateData,
  TemplateDataId,
  TemplateId,
} from '@brainote/common'

import { ArrayUtil } from '../../util/array'
import { MainState } from './main.model'

export type MainSelector<Result> = (state: MainState) => Result

export function selectTemplateList(state: MainState) {
  return state.templates
}
export function selectTemplate(templateId: TemplateId): MainSelector<Template> {
  return state => ArrayUtil.findById(state.templates, templateId)
}
export function selectTemplateData(
  templateId: TemplateId,
  templateDataId: TemplateDataId,
): MainSelector<TemplateData> {
  return state => {
    const template = ArrayUtil.findById(state.templates, templateId)

    return ArrayUtil.findById(template.data, templateDataId)
  }
}
export function selectTemplateDataList(
  templateId: TemplateId,
): MainSelector<TemplateData[]> {
  return state => {
    return ArrayUtil.findById(state.templates, templateId).data
  }
}
