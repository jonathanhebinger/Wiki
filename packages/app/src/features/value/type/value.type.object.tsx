import { Data, Type } from 'src/features/node/type'
import { ValueTypeObjectKeys } from 'src/features/value/type/value.type.object.keys'
import { ValueBlock } from 'src/features/value/value.block'
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

export interface ValueTypeObjectProps {
  value: Type.Object
  onChange: (value: Data.Object) => void
}
export function ValueTypeObject({ value, onChange }: ValueTypeObjectProps) {
  return (
    <ValueBlock
      Label="Keys"
      Inline={
        <ValueInlineItem
          type={OBJECT_ARRAY}
          value={value.keys}
          onChange={onChange}
        />
      }
      Block={<ValueTypeObjectKeys value={value} onChange={onChange} />}
      collapsedClickable
    />
  )
}
