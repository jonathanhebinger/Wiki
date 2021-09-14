import { TemplateDataId, TemplateId } from '@brainote/common'
import { Surface } from '@brainote/ui/structure'

import { NodeProvider } from '../node.context'
import { NodeInfos } from './node.content'

export function NodeMain({
  templateId,
  dataId,
}: {
  templateId: TemplateId
  dataId: TemplateDataId
}) {
  return (
    <NodeProvider templateId={templateId} dataId={dataId}>
      <Surface squared borderless>
        <NodeInfos />
      </Surface>
    </NodeProvider>
  )
}
