import { Icon } from '@brainote/ui/src/components/forms'
import { Block, BlockAction, Shelf, Surface } from '@brainote/ui/src/components/structure'
import { faSave, faUndo } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

import { DataContextProps, DataContextProvider, useDataContext } from '../data.context'
import { DataArray } from './data.array'
import { DataBlock } from './data.block'
import { DataInline } from './data.inline'
import { DataJoin } from './data.join'
import { DataMap } from './data.map'
import { DataType } from './type/data.type'

export interface ValueProps extends DataContextProps {
  Label: React.ReactNode
  actions?: BlockAction[]
}

export function DataItem({
  Label,
  type,
  saved,
  draft,
  onDraftUpdate,
  onSavedUpdate,
  actions,
}: ValueProps) {
  return (
    <DataContextProvider
      type={type}
      Label={Label}
      saved={saved}
      draft={draft}
      onDraftUpdate={onDraftUpdate}
      onSavedUpdate={onSavedUpdate}
    >
      <DataEContent actions={actions} />
    </DataContextProvider>
  )
}

function DataEContent({ actions = [] }: { actions?: BlockAction[] }) {
  const { typeName, modified, handleUndo, handleQuickSave, Label } =
    useDataContext()

  let inline = false
  let Content: JSX.Element

  if (modified) {
    actions.push({
      Label: <Icon icon={faUndo} />,
      handler: handleUndo,
    })
    actions.push({
      Label: <Icon icon={faSave} />,
      handler: handleQuickSave,
    })
  }

  switch (typeName) {
    case 'join':
      return <DataJoin />
    case 'type':
      return <DataType actions={actions} />
    case 'list':
      return <DataArray />
    case 'map':
      return <DataMap />
  }

  switch (typeName) {
    case 'bool':
    case 'number':
    case 'text':
      Content = (
        <Shelf>
          <DataInline />
        </Shelf>
      )
      break
    default:
      Content = <DataBlock />
      break
  }

  switch (typeName) {
    case 'bool':
    case 'number':
    case 'text':
      inline = true
      break
  }

  return (
    <Block
      Label={Label}
      actions={actions}
      Inline={inline && <DataInline />}
      Content={
        inline ? (
          <Surface squared shadowless>
            {Content}
          </Surface>
        ) : (
          Content
        )
      }
    />
  )
}
