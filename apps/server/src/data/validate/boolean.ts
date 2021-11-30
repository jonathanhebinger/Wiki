import { Data, Type } from '@brainote/domain'

export function validateBoolean(type: Type.Boolean, value: Data) {
  return typeof value !== 'bool'
}
