import { Data, Node, Type } from '@brainote/domain'

import { validateData } from './data'

export function validateArray(nodes: Map<string, Node>, type: Type.List, value: Data) {
  if (!Array.isArray(value)) return false

  const minLength = type.minLength ?? 0
  const maxLength = type.maxLength ?? Infinity

  if (minLength > value.length) return false
  if (maxLength < value.length) return false

  return value.every(item => {
    return validateData(nodes, type.of, item)
  })
}
