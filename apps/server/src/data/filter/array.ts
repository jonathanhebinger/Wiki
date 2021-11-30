import { Data, Filter, Type } from '@brainote/domain'

import { filterData } from './data'

export function filterArray(type: Type.List, source: Data, filter: Filter.Any): boolean {
  if (!Array.isArray(source)) return false

  switch (filter.type) {
    case 'array.equal':
      return source === filter.value
    case 'array.includes':
      return source.some(item => item === filter.value)
    case 'array.none':
      return source.every(item => {
        return !filterData(type.of, item, filter.filter)
      })
    case 'array.some':
      return source.some(item => {
        return filterData(type.of, item, filter.filter)
      })
    case 'array.every':
      return source.every(item => {
        return filterData(type.of, item, filter.filter)
      })
    default:
      return false
  }
}
