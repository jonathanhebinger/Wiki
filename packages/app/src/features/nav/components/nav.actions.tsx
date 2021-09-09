import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { ButtonIcon } from 'src/blocs/button.icon'
import { Shelf } from 'src/blocs/structure/shelf'
import { useNodesContext } from 'src/features/nodes/nodes.system'

import { useNavContext } from '../nav.store'

export function NavActions() {
  const [, nodes] = useNodesContext()
  const [, nav] = useNavContext()

  function handleCreate() {
    const node = nodes.create('New Template')

    nodes.attach(node.id, 'template')
  }
  function handleCloseAll() {
    nav.close_all()
  }

  return (
    <Shelf noPadding row>
      <ButtonIcon icon={faPlus} onClick={handleCreate} />
      <ButtonIcon icon={faTimes} onClick={handleCloseAll} />
    </Shelf>
  )
}
