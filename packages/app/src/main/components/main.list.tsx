import { Shelf } from '@brainote/ui/structure'

import { NodeMain } from '../../nodes'
import { useNav } from '../root.store'

export function MainList() {
  const { openedJoined } = useNav()

  const Items = openedJoined.map(({ template, data }) => {
    return (
      <NodeMain
        key={template.id + data.id}
        templateId={template.id}
        dataId={data.id}
      />
    )
  })

  return (
    <Shelf noPadding spacing="lg">
      {Items}
    </Shelf>
  )
}
