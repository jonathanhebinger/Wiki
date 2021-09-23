import { TemplateDataId, TemplateId } from '@brainote/common'
import constate from 'constate'

import { useMain } from '../main'
import { selectTemplate, selectTemplateData } from '../main/state/main.selector'

export type useNodeProps = {
  templateId: TemplateId
  dataId: TemplateDataId
}
export const [NodeProvider, useNode] = constate(
  ({ templateId, dataId }: useNodeProps) => {
    const template = useMain(selectTemplate(templateId))
    const node = useMain(selectTemplateData(templateId, dataId))

    const keys = template.keys

    return { node, template, keys }
  },
)
