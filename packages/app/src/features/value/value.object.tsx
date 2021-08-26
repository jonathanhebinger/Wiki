import { Shelf } from 'src/blocs/structure/shelf'
import { Data, Type } from 'src/features/node/type'
import { DataE } from 'src/features/value/value'
import { useDataContext } from 'src/features/value/value.context'

export function ValueObject() {
  const { type, draft, saved, $change, $save } = useDataContext<
    Type.Object,
    Data.Object
  >()

  const Keys = type.keys.map(({ id, name, type }) => {
    function handleChange(item: Data.Any) {
      $change({ ...draft, [name]: item })
    }
    function handleSave(item: Data.Any) {
      $save({ ...saved, [name]: item })
    }

    return (
      <DataE
        key={id}
        Label={name}
        saved={saved[id]}
        draft={draft[id]}
        type={type}
        onChange={handleChange}
        onSave={handleSave}
      />
    )
  })

  return <Shelf>{Keys}</Shelf>
}
