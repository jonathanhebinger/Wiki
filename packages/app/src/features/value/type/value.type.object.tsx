import { faTrash } from '@fortawesome/free-solid-svg-icons'
import produce from 'immer'
import { ButtonIcon } from 'src/blocs/button.icon'
import { Block } from 'src/blocs/structure/block'
import { GroupItem } from 'src/blocs/structure/group'
import { Shelf } from 'src/blocs/structure/shelf'
import { Type } from 'src/features/node/type'
import { useStoreActions } from 'src/features/root/root.store'
import { ValueBlock } from 'src/features/value/value.block'
import { DataContextProvider, useDataContext } from 'src/features/value/value.context'
import { ValueInline } from 'src/features/value/value.inline'

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

export function ValueTypeObject() {
  return (
    <Block
      Label="Keys"
      Inline={<ValueInline />}
      Content={<ValueTypeObjectKeys />}
      inlineClickable
    />
  )
}

export function ValueTypeObjectKeys() {
  const { draft, saved, $change, $save } = useDataContext<
    Type.Object,
    Type.Object
  >()

  const actions = useStoreActions(actions => actions)

  function keys$add() {
    $change(
      produce(draft, draft => {
        draft.keys.push({
          id: actions.id$generate(),
          name: 'New Key',
          required: true,
          type: { type: 'type' },
        })
      }),
    )
  }

  const keys$update =
    (data: Type.Object, index: number) => (key: Type.ObjectKey) => {
      $change(
        produce(data, draft => {
          draft.keys.find(k => k.id === key.id)
          draft.keys[index] = key
        }),
      )
    }

  function keys$delete(data: Type.Object, index: number) {
    return (e: React.MouseEvent) => {
      $change(
        produce(data, draft => {
          draft.keys.splice(index, 1)
        }),
      )

      e.stopPropagation()
    }
  }

  const Keys = draft.keys.map((key, index) => {
    const Label = (
      <div className="flex justify-between">
        Key - {key.name}
        <ButtonIcon icon={faTrash} onClick={keys$delete(draft, index)} />
      </div>
    )

    return (
      <DataContextProvider
        key={key.id}
        type={OBJECT}
        saved={saved.keys[index]}
        draft={draft.keys[index]}
        onChange={keys$update(draft, index) as any}
        onSave={keys$update(saved, index) as any}
      >
        <Block
          Label={Label}
          Inline={<ValueInline />}
          Content={<ValueBlock />}
          inlineClickable
        />
      </DataContextProvider>
    )
  })

  return (
    <Shelf>
      {Keys}
      <GroupItem
        squared
        className="p-2 cursor-pointer"
        htmlProps={{ onClick: keys$add }}
      >
        Add Item
      </GroupItem>
    </Shelf>
  )
}
