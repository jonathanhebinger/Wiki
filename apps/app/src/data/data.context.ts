import { Data, Type } from '@brainote/domain'
import constate from 'constate/'
import React from 'react'

export interface DataContextProps<Type extends Type.Any = Type.Any, Data = any> {
  type: Type
  Label: React.ReactNode
  saved: Data
  draft: Data
  onDraftUpdate: (value: Data) => void
  onSavedUpdate: (value: Data) => void
}

export interface DataContext<Type extends Type.Any, Data> {
  typeName: Type[0]
  typeConfig: Type[1]
  Label: React.ReactNode
  saved: Data
  draft: Data
  modified: boolean
  handleUndo: () => void
  handleQuickSave: () => void
  handleDraftChange: (data: Data) => void
  handleSavedChange: (data: Data) => void
}

export type DataContextProvider = React.FC<DataContextProps<Type.Any, Data.Any>>
export type DataContextHook = <Type extends Type.Any = Type.Any, Data = any>() => DataContext<
  Type,
  Data
>
export type DataContextPair = [DataContextProvider, DataContextHook]

export const [DataContextProvider, useDataContext] = constate(useData) as DataContextPair

export function useData<Type extends Type.Any = Type.Any, Data = any>({
  type,
  Label,
  saved,
  draft,
  onDraftUpdate,
  onSavedUpdate,
}: DataContextProps<Type, Data>): DataContext<Type, Data> {
  const modified = JSON.stringify(saved) !== JSON.stringify(draft)

  function handleUndo() {
    onDraftUpdate(saved)
  }
  function handleQuickSave() {
    onSavedUpdate(draft)
  }

  return {
    typeName: type[0],
    typeConfig: type[1],
    Label,
    saved,
    draft,
    modified,
    handleUndo,
    handleQuickSave,
    handleDraftChange: onDraftUpdate,
    handleSavedChange: onSavedUpdate,
  }
}
