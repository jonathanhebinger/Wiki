import { Shelf } from 'src/blocs/structure/shelf'

import { Node } from '../node/components/node'
import { TemplateE } from '../templates/components/template'
import { useStoreState } from './root.store'

export function MainList() {
  const items = useStoreState(state => state.nav.opened_nodes)

  const Items = items.map(item => {
    switch (item.type) {
      case 'node':
        return <Node node={item.node} key={item.node.id} />
      case 'template':
        return (
          <TemplateE templateId={item.template.id} key={item.template.id} />
        )
    }
  })

  return <Shelf noPadding>{Items}</Shelf>
}
