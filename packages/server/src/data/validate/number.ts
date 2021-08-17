import { Data, Type } from '@brainote/common'

export function validateNumber(type: Type.Number, value: Data) {
  if (typeof value !== 'number') return false

  const min = type.min ?? -Infinity
  const max = type.max ?? +Infinity

  if (min > value) return false
  if (max < value) return false
  if (type.step && value % type.step !== 0) return false

  return true
}
