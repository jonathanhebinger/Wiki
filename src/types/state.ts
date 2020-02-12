import { INote } from './note'

export interface IState {
  notes: INote[]
  selected: Set<string>
}
