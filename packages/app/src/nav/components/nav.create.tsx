import { Icon } from '@brainote/ui/forms'
import { Block, BlockAction, Shelf } from '@brainote/ui/structure'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { useMainActions } from '../../main'
import { useTemplateDataSelect } from '../../templates'

export function NavCreate() {
  const mainActions = useMainActions()

  const { Select, selected } = useTemplateDataSelect('template')

  function handleCreate() {
    mainActions.dataCreate({ templateId: selected })
  }

  const Content = (
    <Shelf sm border>
      {Select}
    </Shelf>
  )

  const actions: BlockAction[] = [
    { Label: <Icon icon={faPlus} />, handler: handleCreate },
  ]

  return (
    <Block Label="Create" Inline={Select} Content={Content} actions={actions} />
  )
}
