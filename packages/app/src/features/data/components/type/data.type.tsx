import { useEffect } from 'react'
import { useState } from 'react'
import { Shelf } from 'src/blocs/structure/shelf'
import { ValueTypeItem } from 'src/features/data/components/type/data.type.item'
import { ValueTypeSelect } from 'src/features/data/components/type/data.type.select'
import { DataContextProvider, useDataContext } from 'src/features/data/data.context'
import { Type } from 'src/features/node/type'

type ValueTypeRecordItem = {
  draft: Type.Any
  saved: Type.Any | undefined
}
type ValueTypeRecord = Partial<Record<Type.Any['type'], ValueTypeRecordItem>>

export function ValueType() {
  const { draft, saved, $change } = useDataContext<Type.Type, Type.Any>()

  const [current, current$set] = useState<ValueTypeRecordItem>({
    draft,
    saved,
  })
  const [record, record$set] = useState<ValueTypeRecord>({
    [draft.type]: current,
  })

  function record$set_entry(entry: ValueTypeRecordItem) {
    record$set({
      ...record,
      [entry.draft.type]: entry,
    })
  }

  function handleTypeChange(type: Type.Any['type']) {
    let current = record[type]

    if (!current) {
      switch (type) {
        case 'boolean':
        case 'number':
        case 'string':
        case 'type':
          current = {
            draft: { type },
            saved: { type },
          }
          break
        case 'array':
          current = {
            draft: { type, of: { type: 'type' } },
            saved: { type, of: { type: 'type' } },
          }
          break
        case 'object':
          current = {
            draft: { type, keys: [] },
            saved: { type, keys: [] },
          }
          break
      }
    }

    if (current) {
      $change(current.draft)
    }
  }

  useEffect(() => {
    const current = {
      draft,
      saved: saved?.type === draft.type ? saved : draft,
    }

    current$set(current)
    record$set_entry(current)
  }, [draft])

  return (
    <Shelf>
      <ValueTypeSelect type={current.draft.type} onChange={handleTypeChange} />
      <DataContextProvider
        type={{ type: 'type' }}
        saved={current.saved}
        draft={current.draft}
        onChange={$change as any}
      >
        <ValueTypeItem />
      </DataContextProvider>
    </Shelf>
  )
}
