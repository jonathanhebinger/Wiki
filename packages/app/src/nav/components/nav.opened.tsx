import { Icon } from '@brainote/ui/forms'
import { Block, BlockAction } from '@brainote/ui/structure'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { useNav, useNavActions } from '../../main'

export function NavOpened() {
  const nav = useNav()
  const navActions = useNavActions()

  const Nodes = nav.openedJoined.map(item => {
    function handleClose() {
      navActions.open({
        templateId: item.template.id,
        dataId: item.data.id,
      })
    }
    const actions: BlockAction[] = [
      { Label: <Icon icon={faTimes} />, handler: handleClose },
    ]

    return (
      <Block
        key={item.template.id + item.data.id}
        Label={item.data.name}
        actions={actions}
      />
    )
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
