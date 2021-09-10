import { faSave, faUndo } from '@fortawesome/free-solid-svg-icons'
import { Icon } from 'src/blocs/icon'
import { Block, BlockAction } from 'src/blocs/structure/block'
import { Shelf } from 'src/blocs/structure/shelf'

import {
  DataContextProps,
  DataContextProvider,
  useDataContext,
} from '../data.context'
import { DataBlock } from './data.block'
import { DataInline } from './data.inline'
import { DataJoin } from './data.join'

export interface ValueProps extends DataContextProps {
  Label: React.ReactNode
  actions?: BlockAction[]
}

export function DataItem({
  Label,
  type,
  saved,
  draft,
  onChange,
  onSave,
  actions,
}: ValueProps) {
  return (
    <DataContextProvider
      type={type}
      saved={saved}
      draft={draft}
      onChange={onChange}
      onSave={onSave}
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
  const { type, modified, $undo, $save } = useDataContext()

  let inline = false
  let Content: JSX.Element

  if (type.type === 'join') {
    return <DataJoin Label={Label} />
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
    case 'type':
    case 'array':
    case 'object':
      Content = <DataBlock />
      break
  }

  switch (type.type) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'type':
      inline = true
      break
  }

  if (modified) {
    actions.push({
      Label: <Icon icon={faUndo} />,
      handler: $undo,
    })
  }

  if (modified && $save) {
    actions.push({
      Label: <Icon icon={faSave} />,
      handler: $save,
    })
  }

  return (
    <Block
      Label={Label}
      actions={actions}
      Inline={<DataInline />}
      Content={Content}
      inlineClickable={!inline}
    />
  )
}
