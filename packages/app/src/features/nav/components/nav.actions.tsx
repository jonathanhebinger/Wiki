import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { ButtonIcon } from 'src/blocs/button.icon'
import { Shelf } from 'src/blocs/structure/shelf'
import { useActions, useNavActions } from 'src/features/root/root.store'

export function NavActions() {
  const actions = useActions(actions => actions.nodes)
  const nav = useNavActions()

  function handleCreate() {
    const node = actions.create({
      name: 'New Template',
    })

    actions.attach({
      node_id: node.id,
      template_id: 'template',
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
