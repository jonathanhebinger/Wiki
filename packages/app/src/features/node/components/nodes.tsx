import { Shelf } from 'src/blocs/structure/shelf'
import { Node } from 'src/features/node/components/node'
import { useStoreState } from 'src/features/root/root.store'

export function Nodes() {
  const nodes = useStoreState(state => state.nav.opened_nodes)

  return (
    <Shelf noPadding>
      {nodes.map(({ node }) => (
        <Node node={node} key={node.id} />
      ))}
    </Shelf>
  )
}
