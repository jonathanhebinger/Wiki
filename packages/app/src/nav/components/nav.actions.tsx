import { Icon } from '@brainote/ui/forms'
import { Block, Shelf } from '@brainote/ui/structure'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { useActions } from '../../main'
import { useTemplateDataSelect } from '../../templates/template.select'

export function NavActions() {
  const actions = useActions(actions => actions.main)

  const { Select, selected } = useTemplateDataSelect('template')

  function handleCreate() {
    actions.dataCreate({ templateId: selected })
  }

  return (
    <Shelf noPadding>
      <Block
        Label="Create"
        Inline={Select}
        Content={
          <Shelf sm border>
            {Select}
          </Shelf>
        }
        actions={[{ Label: <Icon icon={faPlus} />, handler: handleCreate }]}
      />
    </Shelf>
  )
}
