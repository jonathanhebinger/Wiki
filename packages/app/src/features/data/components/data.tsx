import { faUndo } from '@fortawesome/free-solid-svg-icons'
import { ButtonIcon } from 'src/blocs/button.icon'
import { Block } from 'src/blocs/structure/block'
import { Shelf } from 'src/blocs/structure/shelf'

import { DataContextProps, DataContextProvider, useDataContext } from '../data.context'
import { DataBlock } from './data.block'
import { DataInline } from './data.inline'

export interface ValueProps extends DataContextProps {
  Label: React.ReactNode
}

export function DataItem({ Label, type, saved, draft, onChange }: ValueProps) {
  return (
    <DataContextProvider
      type={type}
      saved={saved}
      draft={draft}
      onChange={onChange}
    >
      <DataEContent Label={Label} />
    </DataContextProvider>
  )
}

function DataEContent({ Label }: { Label: React.ReactNode }) {
  const { type } = useDataContext()

  let inline = false

  switch (type.type) {
    case 'boolean':
    case 'number':
    case 'string':
      inline = true
      break
    case 'array':
    case 'object':
      break
  }

  const Content = inline ? (
    <Shelf>
      <DataInline />
    </Shelf>
  ) : (
    <DataBlock />
  )

  return (
    <Block
      Label={
        <Shelf row noPadding className="justify-between">
          <div className="flex-grow">{Label}</div>
          <DataActions />
        </Shelf>
      }
      Inline={<DataInline />}
      Content={Content}
      inlineClickable={!inline}
    />
  )
}

function DataActions() {
  const { modified, $undo } = useDataContext()

  if (!modified) return null

  return (
    <Shelf noPadding row sm>
      {modified && <ButtonIcon icon={faUndo} onClick={$undo} />}
    </Shelf>
  )
}
