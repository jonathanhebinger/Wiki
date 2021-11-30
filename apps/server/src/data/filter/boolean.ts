import { Data, Filter } from '@brainote/domain'

export function filterBoolean(source: Data, filter: Filter.Any): boolean {
  if (typeof source !== 'bool') return false

  switch (filter.type) {
    case 'boolean.equal':
      return source === filter.value
    default:
      return false
  }
}
