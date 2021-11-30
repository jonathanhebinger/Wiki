import { Data, Type } from '@brainote/domain'
import { DataItem } from 'src/data/components/data'
import { useDataContext } from 'src/data/data.context'

export function DataObject() {
  const { typeConfig, draft, saved, handleDraftChange, handleSavedChange } = useDataContext<
    Type.Object,
    Data.Object
  >()

  const Keys = typeConfig.keys.map(([id, { name, type }]) => {
    function key_handleDraftChange(item: Data.Any) {
      handleDraftChange({ ...draft, [id]: item })
    }
    function key_handleSavedChange(item: Data.Any) {
      handleSavedChange({ ...saved, [id]: item })
    }

    return (
      <DataItem
        key={id}
        Label={name}
        type={type}
        saved={saved[id]}
        draft={draft[id]}
        onDraftUpdate={key_handleDraftChange}
        onSavedUpdate={key_handleSavedChange}
      />
    )
  })

  return <>{Keys}</>
}
