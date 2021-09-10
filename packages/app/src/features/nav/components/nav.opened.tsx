import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { ButtonIcon } from 'src/blocs/button.icon'
import { Section } from 'src/blocs/structure/section'
import { Shelf } from 'src/blocs/structure/shelf'
import { Surface } from 'src/blocs/structure/surface'
import { useNav, useNavActions } from 'src/features/root/root.store'

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
