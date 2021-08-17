import { Data, Type } from '@brainote/common'

import { patchArray } from './array'
import { patchObject } from './object'

export function patchData(
  type: Type.Any,
  source: Data,
  patch: Type.Patch.Any,
): Data {
  switch (type.type) {
    case 'boolean':
      return patch
    case 'number':
      return patch
    case 'string':
      return patch
    case 'array':
      return patchArray(type, source as Data[], patch as Type.Patch.Array)
    case 'object':
      return patchObject(
        type,
        source as Data.Object,
        patch as Type.Patch.Object,
      )
    case 'link':
      return patch
  }
}
