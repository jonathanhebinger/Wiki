import { Checkbox, Input } from '@brainote/ui/forms'
import React from 'react'
import { useDataContext } from 'src/data/data.context'

import { ValueTypeSelect } from './type/data.type.select'

export function DataInline() {
  const { typeName, draft, handleDraftChange } = useDataContext()

  switch (typeName) {
    case 'bool':
      return <Checkbox checked={draft} onChange={handleDraftChange} />
    case 'number':
      return <Input value={draft} onChange={handleDraftChange} />
    case 'text':
      return <Input value={draft} onChange={handleDraftChange} />
    case 'type':
      return <ValueTypeSelect />
  }

  return null
}
