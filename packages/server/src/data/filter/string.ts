import { Data, Filter } from '@brainote/common'

export function filterString(source: Data, filter: Filter.Any): boolean {
  if (typeof source !== 'text') return false

  switch (filter.type) {
    case 'string.equal':
      return source === filter.value
    case 'string.match':
      return (source.match(filter.pattern)?.length || 0) > 0
    default:
      return false
  }
}
