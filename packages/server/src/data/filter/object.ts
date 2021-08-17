import { Data, Filter, Type } from '@brainote/common'

import { dataIsObject } from '../is/object'
import { filterData } from './data'

export function filterObject(
  type: Type.Object,
  source: Data,
  filter: Filter.Any,
): boolean {
  if (!dataIsObject(source)) return false

  switch (filter.type) {
    case 'object.equal':
      return source === filter.value
    case 'object.match':
      return Object.entries(filter.value).every(([key, filter]) => {
        const entry = type.entries.find(([typeKey, type]) => {
          return typeKey === key
        })

        if (!entry) return false

        return filterData(entry[1], source[key], filter)
      })
    default:
      return false
  }
}
