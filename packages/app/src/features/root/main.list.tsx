import { Shelf } from 'src/blocs/structure/shelf'

import { useNavContext } from '../nav/nav.store'
import { NodeMain } from '../nodes/components/node'
import { TemplateMain } from '../templates/components/template'
import { TemplateDataMain } from '../templates/components/template.data'

export function MainList() {
  const [{ opened_nodes }] = useNavContext()

  const Items = opened_nodes.map(item => {
    switch (item.type) {
      case 'template':
        return (
          <TemplateMain
            templateId={'template' + item.template.id}
            key={item.template.id}
          />
        )
      case 'data':
        return (
          <TemplateDataMain
            key={item.template.id + item.node.id}
            template={item.template}
            data={item.node}
          />
        )
      case 'node':
        return <NodeMain key={'node' + item.node.id} nodeId={item.node.id} />
    }
  })

  return <Shelf noPadding>{Items}</Shelf>
}
