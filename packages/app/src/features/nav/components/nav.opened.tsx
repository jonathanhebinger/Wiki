import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { ButtonIcon } from 'src/blocs/button.icon'
import { Section } from 'src/blocs/structure/section'
import { Shelf } from 'src/blocs/structure/shelf'
import { Surface } from 'src/blocs/structure/surface'
import { useStoreActions, useStoreState } from 'src/features/root/root.store'

export function NavOpened() {
  const opened_nodes = useStoreState(state => state.nav.opened_nodes)
  const actions = useStoreActions(state => state.nav)

  const Nodes = opened_nodes.map(({ name, collapsed, ...info }) => {
    return (
      <Surface
        key={name}
        squared
        shadow="sm"
        className="flex justify-between p-1"
      >
        {name}
        <ButtonIcon
          contrast
          size="xs"
          icon={faTimes}
          onClick={() => actions.$close(info as any)}
        />
      </Surface>
    )
  })

  return (
    <Section Label={<>Opened - {opened_nodes.length}</>}>
      <Shelf noPadding>{Nodes}</Shelf>
    </Section>
  )
}
