import { Type } from '@brainote/common'

import { useDataContext } from '../data.context'
import { ValueTypeArray } from './data.type.array'
import { ValueTypeObject } from './data.type.object'

export function ValueTypeItem() {
  const { draft } = useDataContext<Type.Type, Type.Any>()

  switch (draft.type) {
    case 'object':
      return <ValueTypeObject />

    case 'array':
      return <ValueTypeArray />

    case 'join':
      return null

    default:
      return null
  }
}
