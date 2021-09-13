import { ButtonIcon } from '@brainote/ui/forms'
import { Section, Shelf, Surface } from '@brainote/ui/structure'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { useNav, useNavActions } from '../../main'

export function NavOpened() {
  const nav = useNav()
  const navActions = useNavActions()

  const Nodes = nav.opened_nodes.map(item => {
    switch (item.type) {
      case 'node':
        return (
          <Surface
            key={item.node.id}
            squared
            shadow="sm"
            className="flex justify-between p-1"
          >
            {item.node.name}
            <ButtonIcon
              contrast
              size="xs"
              icon={faTimes}
              onClick={() => navActions.close_node(item.node.id)}
            />
          </Surface>
        )
      default:
        return null
    }
  })

  return (
    <Section Label={<>Opened - {nav.opened_nodes.length}</>}>
      <Shelf noPadding>{Nodes}</Shelf>
    </Section>
  )
}
