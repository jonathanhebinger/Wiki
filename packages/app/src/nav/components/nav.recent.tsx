import { Section, Shelf, Surface } from '@brainote/ui/structure'
import { useState } from 'react'

import { useModel, useNavActions } from '../../main'

export function NavRecent() {
  const nodes = useModel(state => state.main.notes)
  const actions = useNavActions()

  const Nodes = nodes.map(template => {
    function handleOpen() {
      actions.open_node(template.id)
    }

    return (
      <Surface
        htmlProps={{
          onClick: handleOpen,
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
    <Section Label={<>Recent</>}>
      <Shelf noPadding>{Nodes}</Shelf>
    </Section>
  )
}
