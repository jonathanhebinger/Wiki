import { useState } from 'react'
import { Section } from 'src/blocs/structure/section'
import { Shelf } from 'src/blocs/structure/shelf'
import { Surface } from 'src/blocs/structure/surface'
import { useNodesContext } from 'src/features/nodes/nodes.system'

import { useNavContext } from '../nav.store'

export function NavTemplates() {
  const [{ templates }] = useNodesContext()
  const [, actions] = useNavContext()

  const Nodes = templates.map(template => {
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
    <Section Label={<>Templates - {templates.length}</>}>
      <Shelf noPadding>{Nodes}</Shelf>
    </Section>
  )
}
