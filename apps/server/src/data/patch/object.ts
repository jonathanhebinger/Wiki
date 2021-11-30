import { Data, Type } from '@brainote/domain'

import { patchData } from './data'

export function patchObject(type: Type.Object, source: Data.Object, patch: Type.Patch.Object) {
  type.entries.forEach(([key, type]) => {
    if (!(key in patch)) return

    source[key] = patchData(type, source[key], patch[key])
  })

  return source
}
