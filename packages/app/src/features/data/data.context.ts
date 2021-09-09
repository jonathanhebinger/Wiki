import { Data, Type } from '@brainote/common'
import constate from 'constate/'

export interface DataContextProps<Type = Type.Any, Data = any> {
  saved: Data | undefined
  draft: Data
  type: Type
  onChange: (value: Data) => void
  onSave?: (value: Data) => void
}

export interface DataContext<Type, Data> {
  type: Type
  saved: Data | undefined
  draft: Data
  modified: boolean
  $change: (data: Data) => void
  $save?: () => void
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

    function $undo() {
      $change(saved)
    }

    const $save = onSave ? () => onSave(draft) : undefined

    return {
      type,
      saved,
      draft,
      modified,
      $change,
      $undo,
      $save,
    }
  },
) as DataContextPair
