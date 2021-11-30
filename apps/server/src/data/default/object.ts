import { Data, Type } from '@brainote/domain'

import { defaultData } from './data'

export function defaultObject(type: Type.Object): Data.Object {
  return Object.fromEntries(
    type.entries.map(([key, type]) => {
      return [key, defaultData(type)]
    }),
  )
}
