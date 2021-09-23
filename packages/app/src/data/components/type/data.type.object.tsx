import { Type } from '@brainote/common'
import { Select } from '@brainote/ui/forms'
import { Block, Shelf } from '@brainote/ui/structure'
import React from 'react'

import { DataContextProvider, useDataContext } from '../../data.context'
import { DataItem } from '../data'
import { DataMap } from '../data.map'

const OBJECT: Type.Object = {
  type: 'object',
  name: 'Key',
  keys: [
    ['name', { name: 'name', type: { type: 'string' } }],
    ['type', { name: 'type', type: { type: 'type' } }],
  ],
  namePath: 'name',
}

export function DataTypeObject() {
  const { draft, saved, handleDraftChange, handleSavedChange } = useDataContext<
    Type.Type,
    Type.Object
  >()

  const nameSelectOptions = draft.keys
    .filter(
      ([keyId, key]) =>
        key.type.type === 'string' || key.type.type === 'number',
    )
    .map(([keyId, key]) => ({
      id: keyId,
      label: key.name,
    }))

  const NameSelect = (
    <Select
      options={nameSelectOptions}
      onSelect={namePath => {
        handleDraftChange({
          ...draft,
          namePath,
        })
      }}
    />
  )

  return (
    <>
      <DataItem
        type={{ type: 'string' }}
        Label="Name"
        draft={draft.name}
        saved={saved.name}
        onDraftUpdate={name => handleDraftChange({ ...draft, name })}
        onSavedUpdate={name => handleSavedChange({ ...saved, name })}
      />
      <DataContextProvider
        type={{ type: 'map', of: OBJECT }}
        Label="Keys"
        draft={draft.keys}
        saved={saved.keys}
        onDraftUpdate={keys =>
          handleDraftChange({ ...draft, keys: keys as any })
        }
        onSavedUpdate={keys =>
          handleSavedChange({ ...draft, keys: keys as any })
        }
      >
        <DataMap />
      </DataContextProvider>
      <Block
        Label="Name Key"
        Inline={NameSelect}
        Content={<Shelf>{NameSelect}</Shelf>}
      />
    </>
  )
}

export function DataTypePath() {}
