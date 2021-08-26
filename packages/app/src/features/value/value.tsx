import { Shelf } from 'src/blocs/structure/shelf'
import { ValueProps } from 'src/features/value/type'
import { ValueBlock } from 'src/features/value/value.block'
import { ValueBlockItem } from 'src/features/value/value.block.item'
import { ValueInlineItem } from 'src/features/value/value.inline.item'

export function Value({ Label: name, type, value, onChange }: ValueProps) {
  switch (type.type) {
    case 'boolean':
    case 'number':
    case 'string':
      return (
        <ValueBlock
          Label={name}
          Inline={
            <ValueInlineItem type={type} value={value} onChange={onChange} />
          }
          Block={
            <Shelf>
              <ValueInlineItem type={type} value={value} onChange={onChange} />
            </Shelf>
          }
        />
      )

    case 'type':
    case 'array':
    case 'object':
      return (
        <ValueBlock
          Label={name}
          Inline={
            <ValueInlineItem type={type} value={value} onChange={onChange} />
          }
          Block={
            <ValueBlockItem type={type} value={value} onChange={onChange} />
          }
          collapsedClickable
        />
      )

    default:
      return null
  }
}
