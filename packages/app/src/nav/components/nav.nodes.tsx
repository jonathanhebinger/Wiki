import { Section, Shelf, Surface } from '@brainote/ui/structure'
import React from 'react'

import { useModel, useNavActions } from '../../root'

export function NavNodes() {
  const list = useModel(state => state.nodes.list)

  const actions = useNavActions()

  const Nodes = list.map(node => {
    function handleOpen() {
      actions.open(node.id)
    }

    return (
      <Surface
        htmlProps={{
          onClick: handleOpen,
        }}
        key={node.id}
        className="p-1"
        squared
        shadow="sm"
      >
        {node['root.name']}
      </Surface>
    )
  })

  return (
    <Section Label={<>Nodes - {list.length}</>}>
      <Shelf noPadding>{Nodes}</Shelf>
    </Section>
  )
}
