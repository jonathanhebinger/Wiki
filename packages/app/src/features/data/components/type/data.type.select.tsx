import { Select } from 'src/blocs/forms/select'
import { Block } from 'src/blocs/structure/block'
import { Shelf } from 'src/blocs/structure/shelf'
import { Type } from 'src/features/node/type'

export function ValueTypeSelect({
  type,
  onChange,
}: {
  type: Type.Any['type']
  onChange: (type: Type.Any['type']) => void
}) {
  const options = [
    'boolean',
    'number',
    'string',
    'array',
    'object',
    'type',
    'node',
  ]

  const Inline = (
    <Select
      options={options.map(option => ({ id: option, label: option }))}
      onSelect={onChange as any}
      value={type}
    />
  )

  return (
    <Block Label="Type" Content={<Shelf>{Inline}</Shelf>} Inline={Inline} />
  )
}
