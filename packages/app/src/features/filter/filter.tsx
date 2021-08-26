import { Block } from 'src/blocs/structure/block'
import { Shelf } from 'src/blocs/structure/shelf'
import { ValueProps } from 'src/features/value/value'
import { ValueBlock } from 'src/features/value/value.block'
import { ValueInline } from 'src/features/value/value.inline'

export function Value({ Label: name, type, onChange }: ValueProps) {
  switch (type.type) {
    case 'boolean':
    case 'number':
    case 'string':
      return (
        <Block
          Label={name}
          Inline={<ValueInline />}
          Content={
            <Shelf>
              <ValueInline />
            </Shelf>
          }
        />
      )

    case 'type':
    case 'array':
    case 'object':
      return (
        <Block
          Label={name}
          Inline={<ValueInline />}
          Content={<ValueBlock />}
          inlineClickable
        />
      )

    default:
      return null
  }
}
