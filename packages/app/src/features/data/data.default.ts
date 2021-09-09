import { Data, Type } from '@brainote/common'

export function Data$get_default(type: Type.Any): Data.Any {
  switch (type.type) {
    case 'boolean':
      return true
    case 'number':
      return 0
    case 'string':
      return ''
    case 'array':
      return []
    case 'object':
      return Object.fromEntries(
        type.keys.map(key => {
          return [key.id, Data$get_default(key.type)]
        }),
      )
    case 'join':
      return ''
    case 'type':
      return { type: 'string' }
  }
}
