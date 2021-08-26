import { ValueType } from 'src/features/value/type/value.type'
import { ValueArray } from 'src/features/value/value.array'
import { useDataContext } from 'src/features/value/value.context'
import { ValueObject } from 'src/features/value/value.object'

export function ValueBlock() {
  const { type } = useDataContext()

  switch (type.type) {
    case 'type':
      return <ValueType />
    case 'array':
      return <ValueArray />
    case 'object':
      return <ValueObject />
  }

  return null
}
