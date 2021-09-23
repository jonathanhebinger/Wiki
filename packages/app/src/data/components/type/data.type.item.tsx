import { Type } from '@brainote/common'

import { useDataContext } from '../../data.context'
import { ValueTypeArray } from './data.type.array'
import { DataTypeJoin } from './data.type.join'
import { ValueTypeMap } from './data.type.map'
import { DataTypeObject } from './data.type.object'

export function ValueTypeItem() {
  const { draft } = useDataContext<Type.Type, Type.Any>()

  switch (draft.type) {
    case 'array':
      return <ValueTypeArray />
    case 'map':
      return <ValueTypeMap />
    case 'object':
      return <DataTypeObject />
    case 'join':
      return <DataTypeJoin />
    default:
      return null
  }
}
