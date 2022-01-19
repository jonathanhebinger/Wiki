import { Type } from '@brainote/domain'
import { Block, BlockAction, Shelf, Surface } from '@brainote/ui/src/components/structure'

import { DataContextProvider, useDataContext } from '../../data.context'
import { ValueTypeItem } from './data.type.item'
import { ValueTypeSelect } from './data.type.select'

export function DataType({ actions = [] }: { actions?: BlockAction[] }) {
  const { Label, draft, saved, handleDraftChange, handleSavedChange } =
    useDataContext<Type.Type, Type.Any>()

  return (
    <>
      <Block
        Label={Label}
        actions={actions}
        Inline={<ValueTypeSelect />}
        Content={
          <>
            <Surface squared shadowless>
              <Shelf sm>
                <ValueTypeSelect />
              </Shelf>
            </Surface>
            <DataContextProvider
              type={['type', {}]}
              Label={Label}
              saved={saved && saved[0] === draft[0] ? saved : draft}
              draft={draft}
              onDraftUpdate={handleDraftChange as any}
              onSavedUpdate={handleSavedChange as any}
            >
              <ValueTypeItem />
            </DataContextProvider>
          </>
        }
      />
    </>
  )
}
