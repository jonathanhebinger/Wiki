import { Shelf } from '@brainote/ui/structure'

import { useNav } from '../root.store'

export function MainList() {
  const { opened_nodes } = useNav()

  const Items = opened_nodes.map(item => {
    switch (item.type) {
      case 'data':
        return null
      case 'template':
        return null
    }
  })

  return (
    <Shelf noPadding spacing="lg">
      {Items}
    </Shelf>
  )
}
