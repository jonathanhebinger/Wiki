import { Type } from '@brainote/domain'

import { useDataContext } from '../../data.context'
import { DataItem } from '../data'

export function ValueTypeArray() {
  const { draft, saved, handleDraftChange, handleSavedChange } = useDataContext<
    Type.Type,
    Type.List
  >()

  function handleDraftUpdate(type: Type.Any) {
    handleDraftChange([draft[0], { ...draft[1], type }])
  }
  function handleSavedUpdate(type: Type.Any) {
    handleSavedChange([saved[0], { ...saved[1], type }])
  }

  return (
    <DataItem
      Label="Of Type"
      type={['type', {}]}
      saved={saved[1].type}
      draft={draft[1].type}
      onDraftUpdate={handleDraftUpdate}
      onSavedUpdate={handleSavedUpdate}
    />
  )
}
