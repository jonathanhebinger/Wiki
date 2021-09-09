import { Type } from '@brainote/common'
import { Shelf } from 'src/blocs/structure/shelf'
import { ValueTypeItem } from 'src/features/data/components/type/data.type.item'
import { ValueTypeSelect } from 'src/features/data/components/type/data.type.select'
import { DataContextProvider, useDataContext } from 'src/features/data/data.context'

export function DataType() {
  const { draft, saved, $change } = useDataContext<Type.Type, Type.Any>()

  return (
    <Shelf>
      <ValueTypeSelect />
      <DataContextProvider
        type={{ type: 'type' }}
        saved={saved?.type === draft.type ? saved : draft}
        draft={draft}
        onChange={$change as any}
      >
        <ValueTypeItem />
      </DataContextProvider>
    </Shelf>
  )
}
