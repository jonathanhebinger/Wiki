import { Shelf } from 'src/blocs/structure/shelf'

import { NodeMain } from '../nodes/components/node'
import { useNav } from './root.store'

export function MainList() {
  const { opened_nodes } = useNav()

  const Items = opened_nodes.map(node => {
    return <NodeMain key={node.id} id={node.id} />
  })

  return <Shelf noPadding>{Items}</Shelf>
}
