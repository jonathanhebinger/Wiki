import { Data } from 'src/data'
import { Id } from 'src/util'

export interface Node {
  id: Id<'node'>

  name: string
  tags: Node['id'][]
  data: { [index: string]: Data }
  info?: any
}