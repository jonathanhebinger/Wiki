import { Block } from 'src/blocs/structure/block'
import { Shelf } from 'src/blocs/structure/shelf'

import { ValueProps } from '../data/components/data'
import { DataBlock } from '../data/components/data.block'
import { DataInline } from '../data/components/data.inline'

export function Value({ Label: name, type }: ValueProps) {
  switch (type.type) {
    case 'boolean':
    case 'number':
    case 'string':
      return (
        <Block
          Label={name}
          Inline={<DataInline />}
          Content={
            <Shelf>
              <DataInline />
            </Shelf>
          }
        />
      )

    case 'array':
    case 'object':
      return (
        <Block
          Label={name}
          Inline={<DataInline />}
          Content={<DataBlock />}
          inlineClickable
        />
      )

    default:
      return null
  }
}
