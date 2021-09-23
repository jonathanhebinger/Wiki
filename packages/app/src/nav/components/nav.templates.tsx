import { Icon } from '@brainote/ui/forms'
import { Block } from '@brainote/ui/structure'
import { faEye, faPlus } from '@fortawesome/free-solid-svg-icons'

import { useMain, useMainActions, useNavActions } from '../../main'
import { selectTemplateList } from '../../main/state/main.selector'

export function NavTemplates() {
  const navActions = useNavActions()

  const templates = useMain(selectTemplateList)
  const mainActions = useMainActions()

  const Templates = templates.map(template => {
    const templateId = template.id

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

    return <Block key={templateId} Label={template.name} actions={actions} />
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
