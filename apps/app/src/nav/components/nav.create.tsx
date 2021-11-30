import { Icon } from '@brainote/ui/forms'
import { Block, BlockAction, Shelf } from '@brainote/ui/structure'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { useMainActions } from '../../main'
import { useTemplateSelect } from '../../templates/hooks/template.select'

export function NavCreate() {
  const mainActions = useMainActions()

  const { Select, selected } = useTemplateSelect()

  function handleCreate() {
    mainActions.templateDataCreate({ templateId: selected })
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
