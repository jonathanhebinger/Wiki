import { Type } from '@brainote/common'

import { useDataContext } from '../../data.context'
import { DataItem } from '../data'

export function ValueTypeArray() {
  const { draft, saved, handleDraftChange, handleSavedChange } = useDataContext<
    Type.Type,
    Type.Array
  >()

  function handleDraftUpdate(of: Type.Any) {
    handleDraftChange({ ...draft, of })
  }
  function handleSavedUpdate(of: Type.Any) {
    handleSavedChange({ ...saved, of })
  }

  return (
    <DataItem
      Label="Of Type"
      type={{ type: 'type' }}
      saved={saved.of}
      draft={draft.of}
      onDraftUpdate={handleDraftUpdate}
      onSavedUpdate={handleSavedUpdate}
    />
  )
}
