import { GroupItem } from 'src/blocs/structure/group'
import { Shelf } from 'src/blocs/structure/shelf'
import { ValueProps } from 'src/features/value/type'
import { ValueInlineItem } from 'src/features/value/value.inline.item'

export function ValueInline({
  Label: name,
  type,
  value,
  onChange,
}: ValueProps) {
  return (
    <GroupItem radius="none" className="flex cursor-pointer">
      <div className="w-1/3 px-2 py-1 self-center">{name}</div>
      <Shelf spacing="sm" className="w-2/3">
        <ValueInlineItem type={type} value={value} onChange={onChange} />
      </Shelf>
    </GroupItem>
  )
}
