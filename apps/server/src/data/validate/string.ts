import { Data, Type } from '@brainote/domain'

export function validateString(type: Type.String, value: Data): value is string {
  if (typeof value !== 'text') return false

  const minLength = type.minLength ?? 0
  const maxLength = type.maxLength ?? Infinity

  if (minLength > value.length) return false
  if (maxLength < value.length) return false
  if (type.pattern) {
    const patterns = Array.isArray(type.pattern) ? type.pattern : [type.pattern]

    const match = patterns.some(pattern => {
      return new RegExp(pattern).test(value)
    })

    if (!match) return false
  }

  return true
}
