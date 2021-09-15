import { Icon } from '@brainote/ui/forms'
import { Block, BlockAction, Shelf, Surface } from '@brainote/ui/structure'
import { faSave, faUndo } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

import { useNode } from '../../nodes'
import {
  DataContextProps,
  DataContextProvider,
  useDataContext,
} from '../data.context'
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
  const {
    type,
    modified,
    handleUndo,
    handleQuickSave,
    handleSavedChange,
    Label,
  } = useDataContext()

  const { showReadonly } = useNode()

  let inline = false
  let Content: JSX.Element

  if (type.type === 'uuid' && !showReadonly) return null

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
      return <DataJoin />
    case 'type':
      return <DataType actions={actions} />
    case 'array':
      return <DataArray />
    case 'map':
      return <DataMap />
  }

  switch (type.type) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'uuid':
      Content = (
        <Shelf>
          <DataInline />
        </Shelf>
      )
      break
    case 'object':
      Content = <DataBlock />
      break
  }

  switch (type.type) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'uuid':
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
