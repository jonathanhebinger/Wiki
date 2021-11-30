import { Data, Type } from '@brainote/domain'

import { defaultObject } from './object'

export function defaultData(type: Type.Any): Data {
  switch (type.type) {
    case 'bool':
      return type.default
    case 'number':
      return type.default
    case 'text':
      return type.default
    case 'list':
      return type.default || []
    case 'object':
      return defaultObject(type)
    case 'link':
      return type.default
    default:
      return false
  }
}
