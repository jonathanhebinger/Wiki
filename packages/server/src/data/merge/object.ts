import { Data } from '@brainote/common'

import { dataIsObject } from '../is/object'

export function mergeObject(...items: Data.Object[]) {
  return items.reduce((acc, item) => {
    if (!item) return acc

    Object.entries(item).forEach(([key, value]) => {
      if (value === undefined) {
        delete acc[key]
      } else if (Array.isArray(value)) {
        acc[key] = [...value]
      } else if (dataIsObject(value)) {
        acc[key] = mergeObject(acc[key] as Data.Object, value)
      } else {
        acc[key] = value
      }
    })

    return acc
  }, {} as Data.Object)
}
