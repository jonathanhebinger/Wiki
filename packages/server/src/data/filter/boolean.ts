import { Data, Filter } from '@brainote/common'

export function filterBoolean(source: Data, filter: Filter.Any): boolean {
  if (typeof source !== 'boolean') return false

  switch (filter.type) {
    case 'boolean.equal':
      return source === filter.value
    default:
      return false
  }
}
