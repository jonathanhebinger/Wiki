import { Type } from '@brainote/common'
import { Block, BlockAction, Shelf, Surface } from '@brainote/ui/structure'

import { DataContextProvider, useDataContext } from '../data.context'
import { ValueTypeItem } from './data.type.item'
import { ValueTypeSelect } from './data.type.select'

export function DataType({
  Label,
  actions = [],
}: {
  Label: React.ReactNode
  actions?: BlockAction[]
}) {
  const { draft, saved, handleDraftChange, handleSavedChange } = useDataContext<
    Type.Type,
    Type.Any
  >()

  return (
    <>
      <Block
        Label={Label}
        actions={actions}
        Content={
          <>
            <Surface squared shadowless>
              <Shelf>
                <ValueTypeSelect />
              </Shelf>
            </Surface>
            <DataContextProvider
              type={{ type: 'type' }}
              saved={saved?.type === draft.type ? saved : draft}
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
