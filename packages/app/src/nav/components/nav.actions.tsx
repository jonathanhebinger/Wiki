import { ButtonIcon } from '@brainote/ui/forms'
import { Shelf } from '@brainote/ui/structure'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

import { useActions, useNavActions } from '../../root'

export function NavActions() {
  const actions = useActions(actions => actions.nodes)
  const nav = useNavActions()

  function handleCreate() {
    actions.create({
      name: 'New Node',
    })
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
