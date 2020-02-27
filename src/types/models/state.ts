import { INote, INoteEditor, Wrapper } from 'src/types'

export interface IState {
  notes: INote[]
  selected: Wrapper<INoteEditor>
}
