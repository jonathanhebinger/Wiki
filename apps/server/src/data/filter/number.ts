import { Data, Filter } from '@brainote/domain'

export function filterNumber(source: Data, filter: Filter.Any): boolean {
  if (typeof source !== 'number') return false

  switch (filter.type) {
    case 'number.equal':
      return source === filter.value
    case 'number.between':
      return source >= filter.min && source <= filter.max
    default:
      return false
  }
}
