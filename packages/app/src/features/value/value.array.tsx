import produce from 'immer'
import { GroupItem } from 'src/blocs/structure/group'
import { Shelf } from 'src/blocs/structure/shelf'
import { Data, Type } from 'src/features/node/type'
import { DataE } from 'src/features/value/value'
import { useDataContext } from 'src/features/value/value.context'

export function ValueArray() {
  const { type, draft, saved, $change, $save } = useDataContext<
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
    function handleSave(item: Data.Any) {
      $save(
        produce(saved as any[], saved => {
          saved[index] = item
        }),
      )
    }

    return (
      <GroupItem key={index}>
        <DataE
          type={type.of}
          draft={draft[index]}
          saved={saved[index]}
          Label={'' + index}
          onChange={handleChange}
          onSave={handleSave}
        />
      </GroupItem>
    )
  })

  return (
    <Shelf>
      {Keys}
      <GroupItem>Add Item</GroupItem>
    </Shelf>
  )
}
