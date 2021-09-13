import { Checkbox, Input } from '@brainote/ui/forms'
import { useDataContext } from 'src/data/data.context'

import { ValueTypeSelect } from './data.type.select'

export function DataInline() {
  const { type, draft, handleDraftChange } = useDataContext()

  switch (type.type) {
    case 'boolean':
      return <Checkbox checked={draft} onChange={handleDraftChange} />
    case 'number':
      return <Input value={draft} onChange={handleDraftChange} />
    case 'string':
      return <Input value={draft} onChange={handleDraftChange} />
    case 'type':
      return <ValueTypeSelect />
  }

  return null
}
