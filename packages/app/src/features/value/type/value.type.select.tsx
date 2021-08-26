import { useMemo } from 'react'
import { Select } from 'src/blocs/select'
import { Shelf } from 'src/blocs/structure/shelf'
import { Type } from 'src/features/node/type'
import { ValueBlock } from 'src/features/value/value.block'

export function ValueTypeSelect({
  type,
  onChange,
}: {
  type: Type.Any['type']
  onChange: (type: Type.Any['type']) => void
}) {
  const options = ['boolean', 'number', 'string', 'array', 'object', 'type']

  const Inline = (
    <Select
      options={options.map(option => ({ id: option, label: option }))}
      onSelect={onChange as any}
      value={type}
    />
  )

  return (
    <ValueBlock Label="Type" Block={<Shelf>{Inline}</Shelf>} Inline={Inline} />
  )
}
