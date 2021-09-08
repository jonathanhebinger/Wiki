import { Shelf } from 'src/blocs/structure/shelf'

import { TemplateMain } from '../templates/components/template'
import { TemplateDataMain } from '../templates/components/template.data'
import { useStoreState } from './root.store'

export function MainList() {
  const items = useStoreState(state => state.nav.opened_nodes)

  const Items = items.map(item => {
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
