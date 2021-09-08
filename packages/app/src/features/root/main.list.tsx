import { Shelf } from 'src/blocs/structure/shelf'

import { useNavContext } from '../nav/nav.store'
import { TemplateMain } from '../templates/components/template'
import { TemplateDataMain } from '../templates/components/template.data'

export function MainList() {
  const [{ opened_nodes }] = useNavContext()

  console.log(opened_nodes)

  const Items = opened_nodes.map(item => {
    switch (item.type) {
      case 'template':
        return (
          <TemplateMain templateId={item.template.id} key={item.template.id} />
        )
      case 'data':
        return (
          <TemplateDataMain
            template={item.template}
            data={item.data}
            key={item.template.id + item.data.id}
          />
        )
    }
  })

  return <Shelf noPadding>{Items}</Shelf>
}
