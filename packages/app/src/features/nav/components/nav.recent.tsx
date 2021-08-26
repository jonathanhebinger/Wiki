import { useState } from 'react'
import { Section } from 'src/blocs/section'
import { Shelf } from 'src/blocs/structure/shelf'
import { Surface } from 'src/blocs/structure/surface'
import { useStoreActions, useStoreState } from 'src/features/root/root.store'

export function NavRecent() {
  const nodes = useStoreState(state => state.nodes.entities)
  const actions = useStoreActions(state => state.nav)

  const [collapsed, collapsed$set] = useState(false)

  function toggle() {
    collapsed$set(!collapsed)
  }

  const Nodes = nodes.map(node => {
    return (
      <Surface
        htmlProps={{
          onClick: () => actions.$open(node.id),
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
    <Section Label={<>Recent</>}>
      <Shelf noPadding>{Nodes}</Shelf>
    </Section>
  )
}
