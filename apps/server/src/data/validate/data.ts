import { Data, Node, Type } from '@brainote/domain'

import { validateArray } from './array'
import { validateBoolean } from './boolean'
import { validateLink } from './link'
import { validateNumber } from './number'
import { validateObject } from './object'
import { validateString } from './string'

export function validateData(nodes: Map<string, Node>, type: Type.Any, value: Data): boolean {
  if (value === undefined) return !('required' in type) || !type.required

  switch (type.type) {
    case 'bool':
      return validateBoolean(type, value)
    case 'number':
      return validateNumber(type, value)
    case 'text':
      return validateString(type, value)
    case 'list':
      return validateArray(nodes, type, value)
    case 'object':
      return validateObject(nodes, type, value)
    case 'link':
      return validateLink(nodes, type, value)
    default:
      return false
  }
}
