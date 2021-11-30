import { TemplateDataId, TemplateId } from '@brainote/domain'
import constate from 'constate'

import { useMain } from '../main'
import {
  selectTemplate,
  selectTemplateData,
  selectTemplateDataDraft,
} from '../main/state/main.selector'

export type useNodeProps = {
  templateId: TemplateId
  templateDataId: TemplateDataId
}
export const [NodeProvider, useNode] = constate(({ templateId, templateDataId }: useNodeProps) => {
  const template = useMain(selectTemplate(templateId))
  const node = useMain(selectTemplateData(templateId, templateDataId))
  const draft = useMain(selectTemplateDataDraft(templateId, templateDataId)) || node

  const keys = template.keys

  return { templateId, templateDataId, node, draft, template, keys }
})
