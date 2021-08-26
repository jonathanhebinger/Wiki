import { type } from 'os'
import { Data, Type } from 'src/features/node/type'
import { ValueTypeObject } from 'src/features/value/type/value.type.object'
import { ValueBlock } from 'src/features/value/value.block'
import { ValueBlockItem } from 'src/features/value/value.block.item'
import { ValueInlineItem } from 'src/features/value/value.inline.item'

const OBJECT: Type.Object = {
  type: 'object',
  keys: [
    { id: 'name', name: 'name', required: true, type: { type: 'string' } },
    {
      id: 'required',
      name: 'required',
      required: true,
      type: { type: 'boolean' },
    },
    { id: 'type', name: 'type', required: true, type: { type: 'type' } },
  ],
}

const OBJECT_ARRAY: Type.Array = {
  type: 'array',
  of: OBJECT,
}

export function ValueTypeItem({
  value,
  onChange,
}: {
  value: Type.Any
  onChange: (type: Data.Any) => void
}) {
  switch (value.type) {
    case 'object':
      return <ValueTypeObject value={value} onChange={onChange} />

    case 'array':
      return (
        <ValueBlock
          Label="Of Type"
          Inline={
            <ValueInlineItem
              type={{ type: 'type' }}
              value={value.of}
              onChange={type => onChange({ ...value, of: type as Type.Any })}
            />
          }
          Block={
            <ValueBlockItem
              type={{ type: 'type' }}
              value={value.of}
              onChange={type => onChange({ ...value, of: type as Type.Any })}
            />
          }
        />
      )

    default:
      return null
  }
}
