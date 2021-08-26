import { faSave, faUndo } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { ButtonIcon } from 'src/blocs/button.icon'
import { Block } from 'src/blocs/structure/block'
import { Shelf } from 'src/blocs/structure/shelf'
import { ValueBlock } from 'src/features/value/value.block'
import {
  DataContextProps,
  DataContextProvider,
  useDataContext,
} from 'src/features/value/value.context'
import { ValueInline } from 'src/features/value/value.inline'

export interface ValueProps extends DataContextProps {
  Label: React.ReactNode
}

export function DataE({
  Label,
  type,
  saved,
  draft,
  onChange,
  onSave,
}: ValueProps) {
  let inline = false

  switch (type.type) {
    case 'boolean':
    case 'number':
    case 'string':
      inline = true
      break
    case 'type':
    case 'array':
    case 'object':
      break
  }

  const Content = inline ? (
    <Shelf>
      <ValueInline />
    </Shelf>
  ) : (
    <ValueBlock />
  )

  return (
    <DataContextProvider
      type={type}
      saved={saved}
      draft={draft}
      onChange={onChange}
      onSave={onSave}
    >
      <Block
        Label={
          <div className="flex justify-between">
            <div>{Label}</div>
            <DataActions />
          </div>
        }
        Inline={<ValueInline />}
        Content={Content}
        inlineClickable={!inline}
      />
    </DataContextProvider>
  )
}

export function DataActions() {
  const { modified, $save, $undo } = useDataContext()

  return (
    <Shelf noPadding row sm>
      {modified && <ButtonIcon icon={faUndo} onClick={$undo} />}
      {modified && <ButtonIcon icon={faSave} onClick={$save} />}
    </Shelf>
  )
}
