import { NodeId } from '@brainote/common'
import { Checkbox } from 'src/blocs/forms/checkbox'
import { Input } from 'src/blocs/forms/input'
import { useDataContext } from 'src/features/data/data.context'

import { ValueTypeSelect } from './type/data.type.select'

export function DataInline() {
  const { type, draft, $change } = useDataContext()

  switch (type.type) {
    case 'boolean':
      return <Checkbox checked={draft as boolean} onChange={$change} />
    case 'number':
      return <Input value={draft as number} onChange={$change} />
    case 'string':
      return <Input value={draft as string} onChange={$change} />
    case 'object':
      return <>{`{ Object - ${type.keys.length} }`}</>
    case 'array':
      return <>{`{ Array - ${(draft as any[]).length} }`}</>
    case 'join':
      return <>{`{ Join - ${draft as NodeId} }`}</>
    case 'type':
      return <ValueTypeSelect />
  }
}
