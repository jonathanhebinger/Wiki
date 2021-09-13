import { Section, Shelf, Surface } from '@brainote/ui/structure'
import { useState } from 'react'

import { useModel, useNavActions } from '../../root'

export function NavRecent() {
  const list = useModel(state => state.nodes.list)
  const actions = useNavActions()

  const [collapsed, collapsed$set] = useState(false)

  function toggle() {
    collapsed$set(!collapsed)
  }

  const Nodes = list.map(template => {
    const handleOpen = () => {
      actions.open(template.id)
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
        {template['root.name']}
      </Surface>
    )
  })

  return (
    <Section Label={<>Recent</>}>
      <Shelf noPadding>{Nodes}</Shelf>
    </Section>
  )
}
