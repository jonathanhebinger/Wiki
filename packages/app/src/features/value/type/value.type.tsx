import { useEffect } from 'react'
import { useState } from 'react'
import { Shelf } from 'src/blocs/structure/shelf'
import { Data, Type } from 'src/features/node/type'
import { ValueTypeItem } from 'src/features/value/type/value.type.item'
import { ValueTypeSelect } from 'src/features/value/type/value.type.select'

export type ValueTypeRecord = Partial<Record<Type.Any['type'], Type.Any>>
export type ValueTypeProps = {
  value: Type.Any
  onChange: (type: Data.Any) => void
}

export function ValueType({ value, onChange }: ValueTypeProps) {
  const [record, record$set] = useState<ValueTypeRecord>({
    [value.type]: value,
  })
  const [current, current$set] = useState<Type.Any>(value)

  useEffect(() => {
    current$set(value)
    record$set({ ...record, [current.type]: current })
  }, [value])

  function handleTypeChange(type: Type.Any['type']) {
    let current = record[type]

    if (!current) {
      switch (type) {
        case 'boolean':
        case 'number':
        case 'string':
        case 'type':
          current = { type }
          break
        case 'array':
          current = { type, of: { type: 'type' } }
          break
        case 'object':
          current = { type, keys: [] }
          break
      }
    }

    if (current) {
      current$set(current)
      record$set({ ...record, [current.type]: current })
      onChange(current)
    }
  }

  return (
    <Shelf>
      <ValueTypeSelect type={current.type} onChange={handleTypeChange} />
      <ValueTypeItem
        value={current}
        onChange={data => {
          onChange(data)
          current$set(data as Type.Any)
        }}
      />
    </Shelf>
  )
}
