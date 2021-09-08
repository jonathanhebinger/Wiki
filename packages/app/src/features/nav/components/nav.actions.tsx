import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { ButtonIcon } from 'src/blocs/button.icon'
import { Shelf } from 'src/blocs/structure/shelf'
import { useTemplatesContext } from 'src/features/templates/templates.store'

import { useNavContext } from '../nav.store'

export function NavActions() {
  const [, templates] = useTemplatesContext()
  const [, nav] = useNavContext()

  function handleCreate() {
    templates.create('New Template')
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
