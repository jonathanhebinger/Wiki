import { faTrash } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { Button } from 'src/blocs/button'
import { ButtonIcon } from 'src/blocs/button.icon'
import { Block } from 'src/blocs/structure/block'
import { Shelf } from 'src/blocs/structure/shelf'
import { useStoreActions } from 'src/features/root/root.store'
import { Type } from 'src/types/type'

import { useDataContext } from '../../data.context'
import { DataItem } from '../data'

const OBJECT: Type.Object = {
  type: 'object',
  keys: [
    { id: 'name', name: 'name', type: { type: 'string' } },
    { id: 'type', name: 'type', type: { type: 'type' } },
  ],
}

export function ValueTypeObject() {
  const { draft } = useDataContext<Type.Object, Type.Object>()

  return (
    <Block
      Label="Keys"
      Inline={<>{draft.keys.length} keys</>}
      Content={<ValueTypeObjectKeys />}
      inlineClickable
    />
  )
}

export function ValueTypeObjectKeys() {
  const { draft, saved, $change } = useDataContext<Type.Object, Type.Object>()

  const draftMap = new Map(draft.keys.map(key => [key.id, key]))
  const savedMap = new Map(saved?.keys.map(key => [key.id, key]))

  const actions = useStoreActions(actions => actions)

  function keys$add() {
    const id = actions.id$generate()

    draftMap.set(id, {
      id,
      name: 'New Key',
      type: { type: 'type' },
    })

    $change({ ...draft, keys: [...draftMap.values()] })
  }

  function keys$update(id: string) {
    return (key: Type.ObjectKey) => {
      draftMap.set(id, key)

      $change({ ...draft, keys: [...draftMap.values()] })
    }
  }

  function keys$delete(id: string) {
    return (e: React.MouseEvent) => {
      draftMap.delete(id)

      $change({ ...draft, keys: [...draftMap.values()] })

      e.stopPropagation()
    }
  }

  const Keys = [...draftMap].map(([id, key]) => {
    const Label = (
      <div className="flex justify-between">
        Key - {key.name}
        <ButtonIcon icon={faTrash} onClick={keys$delete(id)} />
      </div>
    )

    return (
      <DataItem
        key={key.id}
        Label={Label}
        type={OBJECT}
        saved={savedMap.get(id) || draftMap.get(id)}
        draft={draftMap.get(id)}
        onChange={keys$update(id) as any}
      ></DataItem>
    )
  })

  return (
    <Shelf>
      {Keys}
      <Button onClick={keys$add}>Add Item</Button>
    </Shelf>
  )
}
