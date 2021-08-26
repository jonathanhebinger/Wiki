import { Shelf } from 'src/blocs/structure/shelf'
import { Data, Type } from 'src/features/node/type'
import { Value } from 'src/features/value/value'

export interface ValueObjectProps {
  value: { [index: string]: any }
  type: Type.Object
  onChange: (value: Data.Object) => void
}
export function ValueObject({ type, value, onChange }: ValueObjectProps) {
  const Keys = type.keys.map(({ id, name, type }, index) => {
    function handleChange(item: Data.Any) {
      onChange({ ...value, [name]: item })
    }

    return (
      <Value
        key={id}
        Label={name}
        value={value[name]}
        type={type}
        onChange={handleChange}
      />
    )
  })

  return <Shelf>{Keys}</Shelf>
}
