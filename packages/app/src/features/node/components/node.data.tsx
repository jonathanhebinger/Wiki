import { faSave, faUndo } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { ButtonIcon } from 'src/blocs/button.icon'
import { Section } from 'src/blocs/section'
import { Shelf } from 'src/blocs/structure/shelf'
import { NodeDataKey, useNode } from 'src/features/node/node.context'
import { Data } from 'src/features/node/type'
import { Value } from 'src/features/value/value'

export function NodeData() {
  const { keys } = useNode()

  const Keys = keys.map(key => {
    return <NodeDataItem value={key} key={key.typeNode.id} />
  })

  return (
    <Section Label={<>Data - {keys.length}</>}>
      <Shelf noPadding>{Keys}</Shelf>
    </Section>
  )
}

export function NodeDataItem({ value: key }: { value: NodeDataKey }) {
  const nodeContext = useNode()

  const [modified, modified$set] = useState(false)
  const [data, data$set] = useState(key.data)

  function handleChange(data: Data.Any) {
    modified$set(true)
    data$set(data)
  }

  function handleSave() {
    nodeContext.data$set(key.typeNode.id, data)
  }
  function handleUndo() {
    console.log('undo')
    modified$set(false)
    data$set(key.data)
  }

  return (
    <Value
      Label={
        <div className="flex justify-between">
          <div>{key.typeNode.name}</div>
          <Shelf noPadding row sm>
            {modified && <ButtonIcon icon={faUndo} onClick={handleUndo} />}
            {modified && <ButtonIcon icon={faSave} onClick={handleSave} />}
          </Shelf>
        </div>
      }
      type={key.type}
      value={data}
      onChange={handleChange}
    />
  )
}
