import { Data, Type } from '@brainote/common'

import { defaultObject } from './object'

export function defaultData(type: Type.Any): Data {
  switch (type.type) {
    case 'boolean':
      return type.default
    case 'number':
      return type.default
    case 'string':
      return type.default
    case 'array':
      return type.default || []
    case 'object':
      return defaultObject(type)
    case 'link':
      return type.default
    default:
      return false
  }
}
