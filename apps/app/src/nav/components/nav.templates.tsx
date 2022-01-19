import { Icon } from '@brainote/ui/src/components/forms'
import { Block } from '@brainote/ui/src/components/structure'
import { faEye, faPlus } from '@fortawesome/free-solid-svg-icons'

import { useMain, useMainActions, useNavActions } from '../../main'

export function NavTemplates() {
  const navActions = useNavActions()

  const templates = useMain(state => state.templates)
  const mainActions = useMainActions()

  const Templates = templates.map(([templateId]) => {
    function handleCreate() {
      mainActions.templateDataCreate({ templateId })
    }
    function handleOpen() {
      navActions.open({ type: 'template', templateId })
    }

    const actions = [
      { Label: <Icon icon={faPlus} />, handler: handleCreate },
      { Label: <Icon icon={faEye} />, handler: handleOpen },
    ]

    return <Block key={templateId} Label={templateId} actions={actions} />
  })

  function handleCreate() {
    mainActions.templateCreate()
  }

  const actions = [{ Label: <Icon icon={faPlus} />, handler: handleCreate }]

  return (
    <Block
      Label="Templates"
      actions={actions}
      Content={Templates.length !== 0 && Templates}
      noGutter={Templates.length === 0}
      noBottom={Templates.length === 0}
    />
  )
}
