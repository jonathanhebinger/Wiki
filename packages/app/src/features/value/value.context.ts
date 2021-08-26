import constate from 'constate/'
import { Data, Type } from 'src/features/node/type'

export interface DataContextProps<Type = Type.Any, Data = any> {
  saved: Data
  draft: Data
  type: Type
  onChange: (value: Data) => void
  onSave: (value: Data) => void
}

export interface DataContext<Type, Data> {
  type: Type
  saved: Data
  draft: Data
  modified: boolean
  $change: (data: Data) => void
  $save: (data: Data) => void
  $undo: () => void
}

export type DataContextProvider = React.FC<DataContextProps<Type.Any, Data.Any>>
export type DataContextHook = <Type = Type.Any, Data = any>() => DataContext<
  Type,
  Data
>
export type DataContextPair = [DataContextProvider, DataContextHook]

export const [DataContextProvider, useDataContext] = constate(
  ({ saved, draft, type, onChange, onSave }: DataContextProps) => {
    const modified = JSON.stringify(saved) !== JSON.stringify(draft)

    function $change(data: Data) {
      onChange(data)
    }

    function $save(data: Data) {
      onSave(data)
    }

    function $undo() {
      $change(saved)
    }

    return {
      type,
      saved,
      draft,
      modified,
      $change,
      $save,
      $undo,
    }
  },
) as DataContextPair
