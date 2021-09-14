import { ButtonIcon } from '@brainote/ui/forms'
import { Shelf } from '@brainote/ui/structure'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

import { useActions, useNavActions } from '../../main'

export function NavActions() {
  const actions = useActions(actions => actions.main)
  const nav = useNavActions()

  function handleCreate() {
    actions.dataCreate({ template_id: 'note' })
  }

  function handleCloseAll() {
    nav.closeAll()
  }

  return (
    <Shelf noPadding row>
      <ButtonIcon icon={faPlus} onClick={handleCreate} />
      <ButtonIcon icon={faTimes} onClick={handleCloseAll} />
    </Shelf>
  )
}
