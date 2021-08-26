import { GroupItem } from 'src/blocs/structure/group'
import { Shelf } from 'src/blocs/structure/shelf'
import { Data, Type } from 'src/features/node/type'
import { Value } from 'src/features/value/value'

export interface ValueArrayProps {
  value: any[]
  type: Type.Array
  onChange: (data: Data.Any) => void
}
export function ValueArray({ type, value, onChange }: ValueArrayProps) {
  const Keys = value.map((item, index) => {
    return (
      <GroupItem key={index}>
        <Value
          type={type.of}
          value={item}
          Label={'' + index}
          onChange={onChange}
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
