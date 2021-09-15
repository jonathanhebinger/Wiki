import { Data, Type } from '@brainote/common'
import { v4 } from 'uuid'

export function Data$get_default(type: Type.Any): Data.Any {
  switch (type.type) {
    case 'boolean':
      return true
    case 'number':
      return 0
    case 'string':
      return ''
    case 'uuid':
      return v4()
    case 'array':
      return []
    case 'object':
      return Object.fromEntries(
        type.keys.map(([id, key]) => {
          return [id, Data$get_default(key.type)]
        }),
      )
    case 'join':
      return []
    case 'type':
      return { type: 'string' }
  }
}
