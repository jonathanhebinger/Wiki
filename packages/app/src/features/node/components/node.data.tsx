import { useState } from 'react'
import { Section } from 'src/blocs/structure/section'
import { Shelf } from 'src/blocs/structure/shelf'
import { NodeDataKey, useNode } from 'src/features/node/node.context'
import { Data } from 'src/features/node/type'
import { DataE } from 'src/features/value/value'

export function NodeData() {
  const { keys } = useNode()

  const Keys = keys.map(key => {
    return <NodeDataItem item={key} key={key.typeNode.id} />
  })

  return (
    <Section Label={<>Data - {keys.length}</>}>
      <Shelf noPadding>{Keys}</Shelf>
    </Section>
  )
}

export function NodeDataItem({ item }: { item: NodeDataKey }) {
  const nodeContext = useNode()

  const [draft, draft$set] = useState(item.data)

  function handleChange(data: Data.Any) {
    draft$set(data)
  }

  function handleSave(data: Data.Any) {
    draft$set(data)
    nodeContext.data$set(item.typeNode.id, data)
  }

  return (
    <DataE
      Label={item.typeNode.name}
      type={item.type}
      draft={draft}
      saved={item.data}
      onChange={handleChange}
      onSave={handleSave}
    />
  )
}
