import {
  Template,
  TemplateData,
  TemplateDataId,
  TemplateId,
} from '@brainote/common'

import { MainState } from './main.model'

type Selector<State extends {}, Result> = (state: State) => Result

export const templateSelector = (
  templateId: TemplateId,
): Selector<MainState, Template> => {
  return state => {
    return state.templates.find(template => {
      return template.id === templateId
    }) as Template
  }
}

export type TemplateSelector = (templateId: TemplateId) => Template
export type TemplateDataSelector = (
  templateId: TemplateId,
  dataId: TemplateDataId,
) => TemplateData
