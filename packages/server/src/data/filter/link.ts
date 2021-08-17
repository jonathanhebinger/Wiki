import { Data, Filter } from '@brainote/common'

export function filterLink(source: Data, filter: Filter.Any): boolean {
  if (typeof source !== 'string') return false

  switch (filter.type) {
    case 'link.equal':
      return source === filter.value
    default:
      return false
  }
}
