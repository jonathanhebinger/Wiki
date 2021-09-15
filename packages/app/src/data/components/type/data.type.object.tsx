import { Type } from '@brainote/common'

import { DataContextProvider, useDataContext } from '../../data.context'
import { DataMap } from '../data.map'

const OBJECT: Type.Object = {
  type: 'object',
  keys: [
    ['name', { name: 'name', type: { type: 'string' } }],
    ['type', { name: 'type', type: { type: 'type' } }],
  ],
}

export function ValueTypeObject() {
  const { draft, saved, handleDraftChange, handleSavedChange } = useDataContext<
    Type.Type,
    Type.Object
  >()

  return (
    <>
      <DataContextProvider
        Label="Keys"
        type={{ type: 'map', of: OBJECT }}
        draft={draft.keys}
        saved={saved.keys}
        onDraftUpdate={draft =>
          handleDraftChange(Object.fromEntries(draft as any) as any)
        }
        onSavedUpdate={saved =>
          handleSavedChange(Object.fromEntries(saved as any) as any)
        }
      >
        <DataMap />
      </DataContextProvider>
    </>
  )
}
