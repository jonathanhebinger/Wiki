import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ButtonIcon } from 'src/blocs/button.icon'
import { GroupItem } from 'src/blocs/structure/group'
import { Shelf } from 'src/blocs/structure/shelf'
import { Data, Type } from 'src/features/node/type'
import { useStoreActions } from 'src/features/root/root.store'
import { ValueBlock } from 'src/features/value/value.block'
import { ValueBlockItem } from 'src/features/value/value.block.item'
import { ValueInlineItem } from 'src/features/value/value.inline.item'

const OBJECT: Type.Object = {
  type: 'object',
  keys: [
    { id: 'name', name: 'name', required: true, type: { type: 'string' } },
    {
      id: 'required',
      name: 'required',
      required: true,
      type: { type: 'boolean' },
    },
    { id: 'type', name: 'type', required: true, type: { type: 'type' } },
  ],
}

export interface ValueTypeObjectKeysProps {
  value: Type.Object
  onChange: (value: Type.Object) => void
}
export function ValueTypeObjectKeys({
  value,
  onChange,
}: ValueTypeObjectKeysProps) {
  const actions = useStoreActions(actions => actions)

  const Keys = value.keys.map(key => {
    function handleChange(data: Data.Any) {
      onChange({ ...value, [key.id]: data })
    }
    function handleRemove(e: React.MouseEvent) {
      onChange({
        ...value,
        keys: value.keys.filter(fkey => fkey.id !== key.id),
      })
      e.stopPropagation()
    }

    const Label = (
      <div className="flex justify-between">
        Key - {key.name}
        <ButtonIcon icon={faTrash} onClick={handleRemove} />
      </div>
    )
    const Inline = (
      <ValueInlineItem type={OBJECT} value={key} onChange={handleChange} />
    )
    const Block = (
      <ValueBlockItem type={OBJECT} value={key} onChange={handleChange} />
    )
    return (
      <ValueBlock
        key={key.id}
        Label={Label}
        Inline={Inline}
        Block={Block}
        collapsedClickable
      />
    )
  })

  function handleAdd() {
    onChange({
      ...value,
      keys: [
        ...value.keys,
        {
          id: actions.id$generate(),
          name: 'New Key',
          required: true,
          type: { type: 'type' },
        },
      ],
    })
  }

  return (
    <Shelf>
      {Keys}
      <GroupItem
        squared
        className="p-2 cursor-pointer"
        htmlProps={{
          onClick: handleAdd,
        }}
      >
        Add Item
      </GroupItem>
    </Shelf>
  )
}
