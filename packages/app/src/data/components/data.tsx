import { Icon } from '@brainote/ui/forms'
import { Block, BlockAction, Shelf, Surface } from '@brainote/ui/structure'
import { faSave, faUndo } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

import {
  DataContextProps,
  DataContextProvider,
  useDataContext,
} from '../data.context'
import { DataBlock } from './data.block'
import { DataInline } from './data.inline'
import { DataJoin } from './data.join'
import { DataType } from './data.type'

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
      saved={saved}
      draft={draft}
      onDraftUpdate={onDraftUpdate}
      onSavedUpdate={onSavedUpdate}
    >
      <DataEContent Label={Label} actions={actions} />
    </DataContextProvider>
  )
}

function DataEContent({
  Label,
  actions = [],
}: {
  Label: React.ReactNode
  actions?: BlockAction[]
}) {
  const { type, modified, handleUndo, handleQuickSave, handleSavedChange } =
    useDataContext()

  let inline = false
  let Content: JSX.Element

  if (modified) {
    actions.push({
      Label: <Icon icon={faUndo} />,
      handler: handleUndo,
    })
  }

  if (modified && handleSavedChange) {
    actions.push({
      Label: <Icon icon={faSave} />,
      handler: handleQuickSave,
    })
  }

  switch (type.type) {
    case 'join':
      return <DataJoin Label={Label} />
    case 'type':
      return <DataType Label={Label} actions={actions} />
    case 'array':
  }

  switch (type.type) {
    case 'boolean':
    case 'number':
    case 'string':
      Content = (
        <Shelf>
          <DataInline />
        </Shelf>
      )
      break
    case 'array':
    case 'object':
      Content = <DataBlock />
      break
  }

  switch (type.type) {
    case 'boolean':
    case 'number':
    case 'string':
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
