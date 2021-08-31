import { Data } from 'src/types/data'
import { Type } from 'src/types/type'

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
    case 'join':
      return ''
  }
}
