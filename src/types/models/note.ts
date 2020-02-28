import { ID, IFields } from 'src/types/models'

export interface INote {
  id: ID
  title: string
  content: string
  creation: number
  modification: number
}

export interface INoteEditor {
  id: ID
  keys: IFields
}
