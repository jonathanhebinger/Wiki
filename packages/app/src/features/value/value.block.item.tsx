import { Data, Type } from 'src/features/node/type'
import { ValueType } from 'src/features/value/type/value.type'
import { ValueArray } from 'src/features/value/value.array'
import { ValueObject } from 'src/features/value/value.object'

export function ValueBlockItem({
  type,
  value,
  onChange,
}: {
  value: any
  type: Type.Any
  onChange: (data: Data.Any) => void
}) {
  switch (type.type) {
    case 'type':
      return <ValueType value={value} onChange={onChange} />
    case 'array':
      return <ValueArray type={type} value={value} onChange={onChange} />
    case 'object':
      return <ValueObject type={type} value={value} onChange={onChange} />
  }

  return null
}
