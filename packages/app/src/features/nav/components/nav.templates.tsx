import { useState } from 'react'
import { Section } from 'src/blocs/structure/section'
import { Shelf } from 'src/blocs/structure/shelf'
import { Surface } from 'src/blocs/structure/surface'
import { useStoreActions, useStoreState } from 'src/features/root/root.store'

export function NavTemplates() {
  const templates = useStoreState(state => state.templates.entities)
  const actions = useStoreActions(state => state.nav)

  const [collapsed, collapsed$set] = useState(false)

  function toggle() {
    collapsed$set(!collapsed)
  }

  const Nodes = templates.map(template => {
    return (
      <Surface
        htmlProps={{
          onClick: () =>
            actions.$open({ type: 'template', template: template.id }),
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
