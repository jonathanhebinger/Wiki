import { useState } from 'react'
import { Section } from 'src/blocs/structure/section'
import { Shelf } from 'src/blocs/structure/shelf'
import { Surface } from 'src/blocs/structure/surface'
import { useTemplatesContext } from 'src/features/templates/templates.store'

import { useNavContext } from '../nav.store'

export function NavTemplates() {
  const [{ list }] = useTemplatesContext()
  const [, actions] = useNavContext()

  const [collapsed, collapsed$set] = useState(false)

  function toggle() {
    collapsed$set(!collapsed)
  }

  const Nodes = list.map(template => {
    return (
      <Surface
        htmlProps={{
          onClick: () =>
            actions.open({ type: 'template', template: template.id }),
        }}
        key={template.id}
        className="p-1"
        squared
        shadow="sm"
      >
        {template.name}
      </Surface>
    )
  })

  return (
    <Section Label={<>Templates - {list.length}</>}>
      <Shelf noPadding>{Nodes}</Shelf>
    </Section>
  )
}
