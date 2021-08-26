import { Block } from 'src/blocs/structure/block'
import { Data, Type } from 'src/features/node/type'
import { ValueTypeObject } from 'src/features/value/type/value.type.object'
import { ValueBlock } from 'src/features/value/value.block'
import { DataContextProvider, useDataContext } from 'src/features/value/value.context'
import { ValueInline } from 'src/features/value/value.inline'

export function ValueTypeItem() {
  const { draft, saved, $change, $save } = useDataContext<Type.Type, Type.Any>()

  switch (draft.type) {
    case 'object':
      return <ValueTypeObject />

    case 'array':
      return (
        <DataContextProvider
          type={{ type: 'type' }}
          saved={saved}
          draft={draft}
          onChange={(of: Data.Any) => $change({ ...draft, of } as Type.Array)}
          onSave={(of: Data.Any) => $save({ ...saved, of } as Type.Array)}
        >
          <Block
            Label="Of Type"
            Inline={<ValueInline />}
            Content={<ValueBlock />}
          />
        </DataContextProvider>
      )

    default:
      return null
  }
}
