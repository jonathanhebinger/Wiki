import { TemplateDataId, TemplateId } from '@brainote/domain'
import { Surface } from '@brainote/ui/src/components/structure'

import { NodeProvider } from '../node.context'
import { NodeInfos } from './node.content'

export type NodeMainProps = {
  templateId: TemplateId
  dataId: TemplateDataId
}
export function NodeMain({ templateId, dataId }: NodeMainProps) {
  return (
    <NodeProvider templateId={templateId} templateDataId={dataId}>
      <Surface squared borderless>
        <NodeInfos />
      </Surface>
    </NodeProvider>
  )
}
