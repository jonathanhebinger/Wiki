import { useState } from 'react'
import { Shelf } from 'src/blocs/structure/shelf'
import { DataItem } from 'src/features/data'

import { useNode } from '../node.context'

export function NodeInfos() {
  return (
    <Shelf>
      <NodeName />
      <NodeInfo />
    </Shelf>
  )
}

function NodeName() {
  const { name, name$update } = useNode()

  const [draft, draft$set] = useState(name)

  return (
    <DataItem
      Label={<>Name</>}
      draft={draft}
      saved={name}
      type={{ type: 'string' }}
      onChange={draft$set}
      onSave={name$update}
    />
  )
}

function NodeInfo() {
  const { info, info$update } = useNode()

  const [draft, draft$set] = useState(info)

  return (
    <DataItem
      Label={<>About</>}
      draft={draft}
      saved={info}
      type={{ type: 'string' }}
      onChange={draft$set}
      onSave={info$update}
    />
  )
}
