import { useEffect } from 'react'
import { Shelf } from 'src/blocs/structure/shelf'
import { DataE } from 'src/features/data/components/data'
import { useDataContext } from 'src/features/data/data.context'
import { Data$get_default } from 'src/features/data/data.default'
import { Data } from 'src/types/data'
import { Type } from 'src/types/type'

export function ValueObject() {
  const { type } = useDataContext<Type.Object, Data.Object>()

  const Keys = type.keys.map(key => {
    return <ValueObjectKey key={key.id} keyValue={key} />
  })

  return <Shelf>{Keys}</Shelf>
}

interface ValueObjectKeyProps {
  keyValue: Type.ObjectKey
}

function ValueObjectKey({ keyValue: { id, name, type } }: ValueObjectKeyProps) {
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
    <DataE
      key={id}
      Label={name}
      saved={(saved && saved[id]) || draft[id]}
      draft={draft[id]}
      type={type}
      onChange={handleChange}
    />
  )
}
