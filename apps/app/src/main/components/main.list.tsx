import { Shelf } from '@brainote/ui/src/components/structure'

import { NodeMain } from '../../nodes'
import { TemplateMain } from '../../templates/components/template'
import { useNav } from '../root.store'

export function MainList() {
  const { opened } = useNav()

  const Items = opened.map(item => {
    switch (item.type) {
      case 'template': {
        const { templateId } = item

        return <TemplateMain key={templateId} templateId={templateId} />
      }

      case 'data': {
        const { templateId, templateDataId } = item

        return (
          <NodeMain
            key={templateId + templateDataId}
            templateId={templateId}
            dataId={templateDataId}
          />
        )
      }
    }
  })

  return (
    <Shelf noPadding spacing="lg">
      {Items}
    </Shelf>
  )
}
