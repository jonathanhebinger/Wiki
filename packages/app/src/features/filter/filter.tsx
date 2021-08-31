import { Block } from 'src/blocs/structure/block'
import { Shelf } from 'src/blocs/structure/shelf'

import { ValueProps } from '../data/components/data'
import { ValueBlock } from '../data/components/data.block'
import { ValueInline } from '../data/components/data.inline'

export function Value({ Label: name, type }: ValueProps) {
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
