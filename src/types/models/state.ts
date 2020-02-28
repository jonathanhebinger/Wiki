import { INote, INoteEditor, Wrapper } from 'src/types/models'

export interface IState {
  notes: INote[]
  selected: Wrapper<INoteEditor>
}
