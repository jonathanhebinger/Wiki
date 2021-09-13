import { Data, Type } from '@brainote/common'
import constate from 'constate/'

export interface DataContextProps<Type = Type.Any, Data = any> {
  type: Type
  saved: Data
  draft: Data
  onDraftUpdate: (value: Data) => void
  onSavedUpdate: (value: Data) => void
}

export interface DataContext<Type, Data> {
  type: Type
  saved: Data
  draft: Data
  modified: boolean
  handleUndo: () => void
  handleQuickSave: () => void
  handleDraftChange: (data: Data) => void
  handleSavedChange: (data: Data) => void
}

export type DataContextProvider = React.FC<DataContextProps<Type.Any, Data.Any>>
export type DataContextHook = <Type = Type.Any, Data = any>() => DataContext<
  Type,
  Data
>
export type DataContextPair = [DataContextProvider, DataContextHook]

export const [DataContextProvider, useDataContext] = constate(
  useData,
) as DataContextPair

export function useData<Type = Type.Any, Data = any>({
  type,
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
    type,
    saved,
    draft,
    modified,
    handleUndo,
    handleQuickSave,
    handleDraftChange: onDraftUpdate,
    handleSavedChange: onSavedUpdate,
  }
}
