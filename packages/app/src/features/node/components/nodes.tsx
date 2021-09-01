import { Shelf } from 'src/blocs/structure/shelf'
import { Node } from 'src/features/node/components/node'
import { useStoreState } from 'src/features/root/root.store'
import { TemplateE } from 'src/features/templates/components/template'

export function Nodes() {
  const nodes = useStoreState(state => state.nav.opened_nodes)

  const Items = nodes.map(item => {
    switch (item.type) {
      case 'node':
        return <Node node={item.node} key={'node' + item.node.id} />
      case 'template':
        return <TemplateE templateId={item.template.id} />
      case 'data':
        return null
    }
  })

  return <Shelf noPadding>{Items}</Shelf>
}
