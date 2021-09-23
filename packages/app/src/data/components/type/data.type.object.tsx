import { Type } from '@brainote/common'
import { Select } from '@brainote/ui/forms'
import { Block, Shelf } from '@brainote/ui/structure'
import React from 'react'

import { DataContextProvider, useDataContext } from '../../data.context'
import { DataItem } from '../data'
import { DataMap } from '../data.map'

const OBJECT: Type.ObjectConfig = {
  name: 'object',
  keys: [
    ['name', { name: 'name', type: ['text', {}] }],
    ['type', { name: 'type', type: ['type', {}] }],
  ],
  namePath: 'name',
}

export function DataTypeObject() {
  const { draft, saved, handleDraftChange } = useDataContext<Type.Type, Type.Object>()

  console.log(saved, draft)

  const nameSelectOptions = draft[1].keys
    .filter(([keyId, key]) => key.type[0] === 'text' || key.type[0] === 'number')
    .map(([keyId, key]) => ({
      id: keyId,
      label: key.name,
    }))

  const NameSelect = (
    <Select
      options={nameSelectOptions}
      onSelect={namePath => {
        handleDraftChange([draft[0], { ...draft[1], namePath }])
      }}
    />
  )

  function handleDraftConfigChange(config: Partial<Type.ObjectConfig>) {
    handleDraftChange([draft[0], { ...draft[1], ...config }])
  }
  function handleSavedConfigChange(config: Partial<Type.ObjectConfig>) {
    handleDraftChange([draft[0], { ...draft[1], ...config }])
  }

  return (
    <>
      <DataItem
        type={['text', {}]}
        Label="Name"
        draft={draft[0]}
        saved={saved[0]}
        onDraftUpdate={name => handleDraftConfigChange({ name })}
        onSavedUpdate={name => handleSavedConfigChange({ name })}
      />
      <DataContextProvider
        type={['map', { type: ['object', OBJECT] }]}
        Label="Keys"
        draft={draft[1].keys}
        saved={saved[1].keys}
        onDraftUpdate={keys => handleDraftConfigChange({ keys: keys as any })}
        onSavedUpdate={keys => handleSavedConfigChange({ keys: keys as any })}
      >
        <DataMap />
      </DataContextProvider>
      <Block Label="Name Key" Inline={NameSelect} Content={<Shelf>{NameSelect}</Shelf>} />
    </>
  )
}

export function DataTypePath() {}
