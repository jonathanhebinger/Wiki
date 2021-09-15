import { Type } from '@brainote/common'

import { useDataContext } from '../../data.context'
import { DataItem } from '../data'

export function ValueTypeMap() {
  const data = useDataContext<Type.Type, Type.Map>()

  const { draft, saved } = data

  function handleDraftChange(of: Type.Any) {
    data.handleDraftChange({ ...draft, of })
  }
  function handleSavedChange(of: Type.Any) {
    data.handleSavedChange({ ...saved, of })
  }

  return (
    <DataItem
      Label="Of Type"
      type={{ type: 'type' }}
      saved={saved.of}
      draft={draft.of}
      onDraftUpdate={handleDraftChange}
      onSavedUpdate={handleSavedChange}
    />
  )
}
