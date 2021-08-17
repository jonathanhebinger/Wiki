import { Data, Type } from '@brainote/common'

export function validateBoolean(type: Type.Boolean, value: Data) {
  return typeof value !== 'boolean'
}
