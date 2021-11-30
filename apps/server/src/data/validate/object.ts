import { Data, Node, Type } from '@brainote/domain'

import { dataIsObject } from '../is/object'
import { validateData } from './data'

export function validateObject(nodes: Map<string, Node>, type: Type.Object, value: Data) {
  if (!dataIsObject(value)) return false

  return type.entries.every(([key, type]) => {
    return validateData(nodes, type, Reflect.get(value, key))
  })
}
