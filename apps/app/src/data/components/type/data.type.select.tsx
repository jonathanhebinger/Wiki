import { Type } from '@brainote/domain'
import { Select } from '@brainote/ui/src/components/forms'
import { useEffect, useState } from 'react'

import { useDataContext } from '../../data.context'

type ValueTypeRecordItem = {
  draft: Type.Any
  saved: Type.Any | undefined
}
type ValueTypeRecord = Partial<Record<Type.Any[0], ValueTypeRecordItem>>

const options = ['bool', 'number', 'text', 'list', 'join', 'computed']

export function ValueTypeSelect() {
  const {
    draft,
    saved,
    handleDraftChange: $change,
  } = useDataContext<Type.Type, Type.Any>()

  const [current, current$set] = useState<ValueTypeRecordItem>({
    draft,
    saved,
  })
  const [record, record$set] = useState<ValueTypeRecord>({
    [draft[0]]: current,
  })

  function record$set_entry(entry: ValueTypeRecordItem) {
    record$set({
      ...record,
      [entry.draft[0]]: entry,
    })
  }

  function handleTypeChange(type: Type.Any[0]) {
    let current = record[type]

    if (!current) {
      switch (type) {
        case 'bool':
        case 'number':
        case 'text':
        case 'type':
          current = {
            draft: [type, {}],
            saved: [type, {}],
          }
          break
        case 'list':
          current = {
            draft: [type, { type: ['type', {}], namePath: [] }],
            saved: [type, { type: ['type', {}], namePath: [] }],
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
      saved: saved && saved[0] === draft[0] ? saved : draft,
    }

    current$set(current)
    record$set_entry(current)
  }, [draft])

  return (
    <Select
      options={options.map(option => ({ id: option, label: option }))}
      onSelect={handleTypeChange as any}
      value={draft[0]}
    />
  )
}
