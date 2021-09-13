import { ButtonIcon } from '@brainote/ui/forms'
import { Section, Shelf, Surface } from '@brainote/ui/structure'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { useNav, useNavActions } from '../../root'

export function NavOpened() {
  const nav = useNav()
  const navActions = useNavActions()

  const Nodes = nav.opened_nodes.map(node => {
    return (
      <Surface
        key={node.id}
        squared
        shadow="sm"
        className="flex justify-between p-1"
      >
        {node['root.name']}
        <ButtonIcon
          contrast
          size="xs"
          icon={faTimes}
          onClick={() => navActions.close(node.id)}
        />
      </Surface>
    )
  })

  return (
    <Section Label={<>Opened - {nav.opened_nodes.length}</>}>
      <Shelf noPadding>{Nodes}</Shelf>
    </Section>
  )
}
