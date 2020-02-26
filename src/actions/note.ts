import { noteActionClose, noteActionOpen } from 'src/actions/note.details'
import { NOTE_CREATE, NOTE_DELETE, NOTE_SAVE } from 'src/constants'
import { Action, ID, INote, Thunk } from 'src/types'
import { createAction } from 'src/utils'
import uuid from 'uuid'

export type INoteCreateAction = Action<typeof NOTE_CREATE, ID>
export type INoteSaveAction = Action<typeof NOTE_SAVE, INote>
export type INoteDeleteAction = Action<typeof NOTE_DELETE, ID>

export type INoteActions = INoteCreateAction | INoteSaveAction | INoteDeleteAction

export const noteCreateAction = createAction( NOTE_CREATE, ( id: ID ) => id )
export const noteSaveAction = createAction( NOTE_SAVE, ( note: INote ) => note )
export const noteDeleteAction = createAction( NOTE_DELETE, ( id: ID ) => ( { payload: id } ) )

export const noteCreate = (): Thunk => dispatch => {
  const id = uuid.v4()
  dispatch( noteCreateAction( id ) )
  dispatch( noteActionOpen( id ) )
}
export const noteSave = ( note: INote ) => noteSaveAction( note )
export const noteDelete = ( id: ID ): Thunk => dispatch => {
  dispatch( noteActionClose( id ) )
  dispatch( noteDeleteAction( id ) )
}
