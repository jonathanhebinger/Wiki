import { Data, Filter } from '@brainote/domain'

export function filterLink(source: Data, filter: Filter.Any): boolean {
  if (typeof source !== 'text') return false

  switch (filter.type) {
    case 'link.equal':
      return source === filter.value
    default:
      return false
  }
}
