import { Type } from '@brainote/common'

import { useDataContext } from '../../data.context'
import { DataItem } from '../data'

export function ValueTypeMap() {
  const data = useDataContext<Type.Type, Type.Map>()

  const { draft, saved, handleDraftChange, handleSavedChange } = data

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
