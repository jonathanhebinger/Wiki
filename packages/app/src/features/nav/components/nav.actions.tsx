import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { ButtonIcon } from 'src/blocs/button.icon'
import { Shelf } from 'src/blocs/structure/shelf'
import { useStoreActions } from 'src/features/root/root.store'

export function NavActions() {
  const actions = useStoreActions(state => state)

  function handleCreate() {
    actions.nodes.$create({ tags: [] })
  }
  function handleCloseAll() {
    actions.nav.$close_all()
  }

  return (
    <Shelf noPadding row>
      <ButtonIcon icon={faPlus} onClick={handleCreate} />
      <ButtonIcon icon={faTimes} onClick={handleCloseAll} />
    </Shelf>
  )
}
