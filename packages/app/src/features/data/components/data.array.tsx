import produce from 'immer'
import { GroupItem } from 'src/blocs/structure/group'
import { Shelf } from 'src/blocs/structure/shelf'
import { Data } from 'src/types/data'
import { Type } from 'src/types/type'

import { useDataContext } from '../data.context'
import { Data$get_default } from '../data.default'
import { DataItem } from './data'

export function DataArray() {
  const { type, draft, saved, $change } = useDataContext<
    Type.Array,
    Data.Array
  >()

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
          onChange={handleChange}
        />
      </GroupItem>
    )
  })

  function handleAdd() {
    $change([...draft, Data$get_default(type.of)])
  }

  return (
    <Shelf>
      {Keys}
      <GroupItem
        squared
        className="p-2 cursor-pointer"
        htmlProps={{ onClick: handleAdd }}
      >
        Add Item
      </GroupItem>
    </Shelf>
  )
}
