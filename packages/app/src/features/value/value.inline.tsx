import { Checkbox, Input } from 'src/blocs/forms/input'
import { Type } from 'src/features/node/type'
import { useDataContext } from 'src/features/value/value.context'

export function ValueInline() {
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
    case 'type':
      return <>{`{ Type - ${(draft as Type.Any).type} }`}</>
  }

  return null
}
