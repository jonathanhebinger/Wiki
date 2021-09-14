import { ButtonIcon } from '@brainote/ui/forms'
import { Section, Shelf, Surface } from '@brainote/ui/structure'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { useNav, useNavActions } from '../../main'

export function NavOpened() {
  const nav = useNav()
  const navActions = useNavActions()

  const Nodes = nav.openedJoined.map(item => {
    return (
      <Surface
        key={item.template.id + item.data.id}
        squared
        shadow="sm"
        className="flex justify-between p-1"
      >
        {item.data.name}
        <ButtonIcon
          contrast
          size="xs"
          icon={faTimes}
          onClick={() =>
            navActions.close({
              templateId: item.template.id,
              dataId: item.data.id,
            })
          }
        />
      </Surface>
    )
  })

  return (
    <Section Label={<>Opened - {nav.openedJoined.length}</>}>
      <Shelf noPadding>{Nodes}</Shelf>
    </Section>
  )
}
