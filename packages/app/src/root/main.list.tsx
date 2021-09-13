import { Shelf } from '@brainote/ui/structure'

import { NodeMain } from '../nodes/components/node'
import { useNav } from './root.store'

export function MainList() {
  const { opened_nodes } = useNav()

  const Items = opened_nodes.map(node => {
    return <NodeMain key={node.id} id={node.id} />
  })

  return (
    <Shelf noPadding spacing="lg">
      {Items}
    </Shelf>
  )
}
