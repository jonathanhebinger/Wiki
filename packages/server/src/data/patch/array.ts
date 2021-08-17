import { Data, Type } from '@brainote/common'

import { patchData } from './data'

export function patchArray(
  type: Type.Array,
  source: Data[],
  patch: Type.Patch.Array,
) {
  patch.forEach(patch => {
    switch (patch.type) {
      case 'set':
        source = patch.value
        break
      case 'insert':
        if (
          patch.index === undefined ||
          patch.index < 0 ||
          patch.index > source.length
        ) {
          source.push(patch.value)
        } else {
          source[patch.index] = patch.value
        }
        break
      case 'update':
        source[patch.index] = patchData(
          type.of,
          source[patch.index],
          patch.value,
        )
        break
      case 'move':
        // TODO
        break
      case 'delete':
        if ('index' in patch) {
          source.splice(patch.index, 1)
        }
        if ('value' in patch) {
          source = source.filter(item => item !== patch.value)
        }
        break
    }
  })

  return source
}
