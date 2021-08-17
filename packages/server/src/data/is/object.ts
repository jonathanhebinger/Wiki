import { Data } from '@brainote/common'

export function dataIsObject(value: Data): value is Data.Object {
  return !Array.isArray(value) && typeof value === 'object' && value !== null
}
