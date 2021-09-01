import { faSave } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { ButtonIcon } from 'src/blocs/button.icon'
import { Section } from 'src/blocs/structure/section'
import { Shelf } from 'src/blocs/structure/shelf'
import { DataItem } from 'src/features/data/components/data'
import { Data$get_default } from 'src/features/data/data.default'
import { Data } from 'src/types/data'

import { NodeDataKey, useNode } from '../node.context'

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
  const { data$set } = useNode()

  const [draft, draft$set] = useState(item.data || Data$get_default(item.type))

  const modified = JSON.stringify(item.data) !== JSON.stringify(draft)

  function handleChange(data: Data.Any) {
    draft$set(data)
  }

  function handleSave() {
    data$set(item.typeNode.id, draft)
  }

  const Label = (
    <div className="flex justify-between">
      <div>{item.typeNode.name}</div>
      {modified && <ButtonIcon icon={faSave} onClick={handleSave} />}
    </div>
  )

  return (
    <DataItem
      Label={Label}
      type={item.type}
      draft={draft}
      saved={item.data}
      onChange={handleChange}
    />
  )
}
