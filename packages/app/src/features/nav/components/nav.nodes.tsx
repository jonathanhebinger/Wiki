import { useState } from 'react'
import { Section } from 'src/blocs/structure/section'
import { Shelf } from 'src/blocs/structure/shelf'
import { Surface } from 'src/blocs/structure/surface'
import { useNodesContext } from 'src/features/nodes/nodes.system'

import { useNavContext } from '../nav.store'

export function NavNodes() {
  const [{ list }] = useNodesContext()
  const [, actions] = useNavContext()

  const Nodes = list.map(node => {
    function handleOpen() {
      actions.open({ type: 'node', node: node.id })
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
        {node.name}
      </Surface>
    )
  })

  return (
    <Section Label={<>Nodes - {list.length}</>}>
      <Shelf noPadding>{Nodes}</Shelf>
    </Section>
  )
}
