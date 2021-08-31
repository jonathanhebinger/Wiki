import constate from 'constate/'
import { Data } from 'src/types/data'
import { Type } from 'src/types/type'

export interface DataContextProps<Type = Type.Any, Data = any> {
  saved: Data | undefined
  draft: Data
  type: Type
  onChange: (value: Data) => void
}

export interface DataContext<Type, Data> {
  type: Type
  saved: Data | undefined
  draft: Data
  modified: boolean
  $change: (data: Data) => void
  $undo: () => void
}

export type DataContextProvider = React.FC<DataContextProps<Type.Any, Data.Any>>
export type DataContextHook = <Type = Type.Any, Data = any>() => DataContext<
  Type,
  Data
>
export type DataContextPair = [DataContextProvider, DataContextHook]

export const [DataContextProvider, useDataContext] = constate(
  ({ saved, draft, type, onChange }: DataContextProps) => {
    const modified = JSON.stringify(saved) !== JSON.stringify(draft)

    function $change(data: Data) {
      onChange(data)
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
      $undo,
    }
  },
) as DataContextPair
