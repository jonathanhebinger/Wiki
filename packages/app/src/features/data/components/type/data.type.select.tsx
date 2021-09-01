import { Select } from 'src/blocs/forms/select'
import { Type } from 'src/types/type'

export function ValueTypeSelect({
  type,
  onChange,
}: {
  type: Type.Any['type']
  onChange: (type: Type.Any['type']) => void
}) {
  const options = ['boolean', 'number', 'string', 'array', 'object', 'join']

  return (
    <Select
      options={options.map(option => ({ id: option, label: option }))}
      onSelect={onChange as any}
      value={type}
    />
  )
}
