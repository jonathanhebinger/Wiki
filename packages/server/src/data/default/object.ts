import { Data, Type } from '@brainote/common'

import { defaultData } from './data'

export function defaultObject(type: Type.Object): Data.Object {
  return Object.fromEntries(
    type.entries.map(([key, type]) => {
      return [key, defaultData(type)]
    }),
  )
}
