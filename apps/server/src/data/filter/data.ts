import { Data, Filter, Type } from '@brainote/domain'

import { filterArray } from './array'
import { filterBoolean } from './boolean'
import { filterLink } from './link'
import { filterNumber } from './number'
import { filterObject } from './object'
import { filterString } from './string'

export function filterData(type: Type.Any, source: Data, filter: Filter.Any): boolean {
  if (source === undefined) return false

  switch (filter.type) {
    case 'and':
      return filter.filters.every(filter => {
        return filterData(type, source, filter)
      })
    case 'or':
      return filter.filters.some(filter => {
        return filterData(type, source, filter)
      })

    default:
      switch (type.type) {
        case 'bool':
          return filterBoolean(source, filter)
        case 'number':
          return filterNumber(source, filter)
        case 'text':
          return filterString(source, filter)
        case 'list':
          return filterArray(type, source, filter)
        case 'object':
          return filterObject(type, source, filter)
        case 'link':
          return filterLink(source, filter)
      }
  }
}
