import { INote, INoteDetails } from './note'

export interface IState {
  notes: INote[]
  selected: { [ index: string ]: INoteDetails }
}
