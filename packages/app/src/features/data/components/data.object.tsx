import { Data, Type } from '@brainote/common'
import { useEffect } from 'react'
import { Shelf } from 'src/blocs/structure/shelf'
import { DataItem } from 'src/features/data/components/data'
import { useDataContext } from 'src/features/data/data.context'
import { Data$get_default } from 'src/features/data/data.default'

export function DataObject() {
  const { type } = useDataContext<Type.Object, Data.Object>()

  const Keys = type.keys.map(key => {
    return <DataObjectKey key={key.id} keyValue={key} />
  })

  return <Shelf>{Keys}</Shelf>
}

interface DataObjectKeyProps {
  keyValue: Type.ObjectKey
}

function DataObjectKey({ keyValue: { id, name, type } }: DataObjectKeyProps) {
  const { draft, saved, $change } = useDataContext<Type.Object, Data.Object>()

  function handleChange(item: Data.Any) {
    $change({ ...draft, [id]: item })
  }

  useEffect(() => {
    if (draft[id] === undefined) {
      $change({ ...draft, [id]: Data$get_default(type) })
    }
  }, [])

  return (
    <DataItem
      key={id}
      Label={'- ' + name}
      saved={(saved && saved[id]) || draft[id]}
      draft={draft[id]}
      type={type}
      onChange={handleChange}
    />
  )
}
