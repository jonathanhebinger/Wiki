import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { ButtonIcon } from 'src/blocs/button.icon'
import { Section } from 'src/blocs/structure/section'
import { Shelf } from 'src/blocs/structure/shelf'
import { Surface } from 'src/blocs/structure/surface'

import { useNavContext } from '../nav.store'

export function NavOpened() {
  const [{ opened_nodes }, actions] = useNavContext()

  const Nodes = opened_nodes.map(({ name, collapsed, ...info }) => {
    const key =
      info.type === 'template'
        ? info.template.id
        : info.template.id + info.data.id
    return (
      <Surface
        key={key}
        squared
        shadow="sm"
        className="flex justify-between p-1"
      >
        {name}
        <ButtonIcon
          contrast
          size="xs"
          icon={faTimes}
          onClick={() => actions.close(info as any)}
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
