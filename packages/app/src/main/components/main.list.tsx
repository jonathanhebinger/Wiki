import { Shelf } from '@brainote/ui/structure'

import { NodeMain } from '../../nodes'
import { TemplateMain } from '../../templates/components/template'
import { useNav } from '../root.store'

export function MainList() {
  const { openedJoined } = useNav()

  const Items = openedJoined.map(item => {
    switch (item.type) {
      case 'template': {
        const { template } = item

        return <TemplateMain key={template.id} templateId={template.id} />
      }

      case 'data': {
        const { template, templateData } = item

        return (
          <NodeMain
            key={template.id + templateData.id}
            templateId={template.id}
            dataId={templateData.id}
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
