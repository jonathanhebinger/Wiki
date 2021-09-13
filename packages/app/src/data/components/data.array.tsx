import { Data, Type } from '@brainote/common'
import { GroupItem } from '@brainote/ui/structure'
import produce from 'immer'

import { useDataContext } from '../data.context'
import { Data$get_default } from '../data.default'
import { DataItem } from './data'

export function DataArray() {
  const {
    type,
    draft,
    saved,
    handleDraftChange: $change,
  } = useDataContext<Type.Array, Data.Array>()

  const Keys = draft.map((_, index) => {
    function handleChange(item: Data.Any) {
      $change(
        produce(draft as any[], draft => {
          draft[index] = item
        }),
      )
    }

    return (
      <GroupItem key={index}>
        <DataItem
          type={type.of}
          draft={draft[index]}
          saved={saved && saved[index]}
          Label={'' + index}
          onDraftUpdate={handleChange}
          onSavedUpdate={console.log}
        />
      </GroupItem>
    )
  })

  function handleAdd() {
    $change([...draft, Data$get_default(type.of)])
  }

  return (
    <>
      {Keys}
      <GroupItem
        squared
        className="p-2 cursor-pointer"
        htmlProps={{ onClick: handleAdd }}
      >
        Add Item
      </GroupItem>
    </>
  )
}
