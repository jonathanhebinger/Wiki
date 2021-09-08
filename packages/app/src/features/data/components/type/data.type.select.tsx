import { useEffect } from 'react'
import { useState } from 'react'
import { Select } from 'src/blocs/forms/select'
import { useDataContext } from 'src/features/data/data.context'
import { Type } from 'src/types/type'

type ValueTypeRecordItem = {
  draft: Type.Any
  saved: Type.Any | undefined
}
type ValueTypeRecord = Partial<Record<Type.Any['type'], ValueTypeRecordItem>>

const options = ['boolean', 'number', 'string', 'array', 'object', 'join']

export function ValueTypeSelect() {
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
    <Select
      options={options.map(option => ({ id: option, label: option }))}
      onSelect={handleTypeChange as any}
      value={draft.type}
    />
  )
}
