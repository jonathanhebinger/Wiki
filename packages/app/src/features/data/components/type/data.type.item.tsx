import { Type } from '@brainote/common'

import { useDataContext } from '../../data.context'
import { DataItem } from '../data'
import { ValueTypeObject } from './data.type.object'

export function ValueTypeItem() {
  const { draft, saved, $change } = useDataContext<Type.Type, Type.Any>()

  switch (draft.type) {
    case 'object':
      return <ValueTypeObject />

    case 'array':
      return (
        <DataItem
          Label="Of Type"
          type={{ type: 'type' }}
          saved={(saved as Type.Array)?.of}
          draft={draft.of}
          onChange={(of: Type.Any) => $change({ ...draft, of })}
        />
      )

    case 'join':
      return null

    default:
      return null
  }
}
