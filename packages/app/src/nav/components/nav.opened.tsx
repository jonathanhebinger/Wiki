import { Icon } from '@brainote/ui/forms'
import { Block, BlockAction } from '@brainote/ui/structure'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { useNav, useNavActions } from '../../main'

export function NavOpened() {
  const nav = useNav()
  const navActions = useNavActions()

  const Nodes = nav.openedJoined.map(item => {
    switch (item.type) {
      case 'template': {
        const { template } = item

        function handleClose() {
          navActions.close({
            type: 'template',
            templateId: template.id,
          })
        }

        const actions: BlockAction[] = [
          { Label: <Icon icon={faTimes} />, handler: handleClose },
        ]

        const key = template.id
        const name = template.name

        return <Block key={key} Label={name} actions={actions} />
      }

      case 'data': {
        const { template, templateData } = item

        function handleClose() {
          navActions.close({
            type: 'data',
            templateId: template.id,
            templateDataId: templateData.id,
          })
        }

        const actions: BlockAction[] = [
          { Label: <Icon icon={faTimes} />, handler: handleClose },
        ]

        const key = template.id + templateData.id
        const name = templateData[template.namePath]

        return <Block key={key} Label={name} actions={actions} />
      }
    }
  })

  function handleCloseAll() {
    navActions.closeAll()
  }
  const actions: BlockAction[] = [
    { Label: <Icon icon={faTimes} />, handler: handleCloseAll },
  ]

  return (
    <Block
      Label={'Opened - ' + Nodes.length}
      actions={actions}
      Content={Nodes.length !== 0 && Nodes}
      noGutter={Nodes.length === 0}
      noBottom={Nodes.length === 0}
    />
  )
}
