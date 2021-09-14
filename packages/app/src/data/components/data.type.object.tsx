import { Type } from '@brainote/common'
import { Icon } from '@brainote/ui/forms'
import { Block, BlockAction } from '@brainote/ui/structure'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { v4 } from 'uuid'

import { useDataContext } from '../data.context'
import { DataItem } from './data'

const OBJECT: Type.Object = {
  type: 'object',
  keys: [
    { id: 'name', name: 'name', type: { type: 'string' } },
    { id: 'type', name: 'type', type: { type: 'type' } },
  ],
}

export function ValueTypeObject() {
  const { draft, saved, handleDraftChange, handleSavedChange } = useDataContext<
    Type.Object,
    Type.Object
  >()

  function handleKeyAdd() {
    const id = v4()

    draftMap.set(id, {
      id,
      name: 'New Key',
      type: { type: 'type' },
    })

    handleDraftChange({ ...draft, keys: [...draftMap.values()] })
  }

  const actions = [{ Label: <Icon icon={faPlus} />, handler: handleKeyAdd }]

  const draftMap = new Map(draft.keys.map(key => [key.id, key]))
  const savedMap = new Map(saved.keys.map(key => [key.id, key]))

  function handleKeyDelete(id: string) {
    return () => {
      draftMap.delete(id)

      handleDraftChange({ ...draft, keys: [...draftMap.values()] })
    }
  }
  function handleDraftKeyUpdate(id: string) {
    return (key: Type.ObjectKey) => {
      draftMap.set(id, key)

      handleDraftChange({ ...draft, keys: [...draftMap.values()] })
    }
  }
  function handleSavedKeyUpdate(id: string) {
    return (key: Type.ObjectKey) => {
      savedMap.set(id, key)

      handleSavedChange({ ...draft, keys: [...savedMap.values()] })
    }
  }

  const Keys = [...draftMap].map(([id, key]) => {
    const actions: BlockAction[] = [
      { Label: <Icon icon={faTrash} />, handler: handleKeyDelete(id) },
    ]

    return (
      <DataItem
        key={id}
        Label={<>Key - {key.name}</>}
        type={OBJECT}
        saved={savedMap.get(id)}
        draft={draftMap.get(id)}
        actions={actions}
        onDraftUpdate={handleDraftKeyUpdate(id)}
        onSavedUpdate={handleSavedKeyUpdate(id)}
      />
    )
  })

  return <Block Label="Keys" Content={Keys} actions={actions} />
}
