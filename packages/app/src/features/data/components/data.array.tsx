import produce from 'immer'
import { GroupItem } from 'src/blocs/structure/group'
import { Shelf } from 'src/blocs/structure/shelf'
import { Data, Type } from 'src/features/node/type'

import { useDataContext } from '../data.context'
import { Data$get_default } from '../data.default'
import { DataE } from './data'

export function ValueArray() {
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
        <DataE
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
    $change([...draft, Data$get_default(type)])
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
