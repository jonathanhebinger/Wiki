import { Input } from 'src/blocs/input'
import { Type } from 'src/features/node/type'

export function ValueInlineItem({
  type,
  value,
  onChange,
}: {
  value: any
  type: Type.Any
  onChange: (type: Type.Any) => void
}) {
  switch (type.type) {
    case 'boolean':
      return <Input value={value} />
    case 'number':
      return <Input value={value} />
    case 'string':
      return <Input value={value} />
    case 'object':
      return <>{`{ Object - ${type.keys.length} }`}</>
    case 'array':
      return <>{`{ Array - ${value.length} }`}</>
    case 'type':
      return <>{`{ Type - ${value.type} }`}</>
  }

  return null
}
