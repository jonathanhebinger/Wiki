import { IFields } from 'src/types'
import { ID } from 'src/types/id'

export interface INote {
  id: ID
  title: string
  content: string
  creation: number
  modification: number
}

export interface INoteDetails {
  id: ID
  keys: IFields
}
