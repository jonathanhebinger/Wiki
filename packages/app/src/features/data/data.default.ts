import { Data, Type } from 'src/features/node/type'

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
      return {}
    case 'type':
      return { type: 'type' }
    case 'node':
      return ''
  }
}
