import { Data, Type } from '@brainote/common'

export function Data$get_default(type: Type.Any): Data.Any {
  switch (type.type) {
    case 'boolean':
      return true
    case 'number':
      return 0
    case 'string':
      return ''
    case 'map':
      return []
    case 'array':
      return []
    case 'join':
      return []
    case 'type':
      return { type: 'string' }
    case 'object':
      return {
        type: 'object',
        name: 'Object',
        keys: [['name', { name: 'name', type: { type: 'string' } }]],
        namePath: 'name',
      }
  }
}
