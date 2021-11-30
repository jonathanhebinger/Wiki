import { Data, Type } from '@brainote/domain'

export function Data$get_default(type: Type.Any): Data.Any {
  switch (type[0]) {
    case 'bool':
      return true
    case 'number':
      return 0
    case 'text':
      return ''
    case 'map':
      return []
    case 'list':
      return []
    case 'join':
      return []
    case 'type':
      return { id: 'text' }
    case 'object':
      return {
        keys: [['name', { id: 'name', type: { id: 'text' } }]],
        namePath: 'name',
      }
  }
}
