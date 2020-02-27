import { NOTE_CREATE, NOTE_DELETE, NOTE_SAVE } from 'src/constants'
import { noteClose, noteOpen } from 'src/state'
import { Action, ID, INote, Thunk } from 'src/types'
import { createAction } from 'src/utils'
import uuid from 'uuid'

export type NoteCreateAction = Action<typeof NOTE_CREATE, ID>
export type NoteSaveAction = Action<typeof NOTE_SAVE, INote>
export type NoteDeleteAction = Action<typeof NOTE_DELETE, ID>

export type NoteActions = NoteCreateAction | NoteSaveAction | NoteDeleteAction

export const noteCreateAction = createAction( NOTE_CREATE, ( id: ID ) => id )
export const noteSaveAction = createAction( NOTE_SAVE, ( note: INote ) => note )
export const noteDeleteAction = createAction( NOTE_DELETE, ( id: ID ) => id )

export const noteCreate = (): Thunk => dispatch => {
  const id = uuid.v4()
  dispatch( noteCreateAction( id ) )
  dispatch( noteOpen( id ) )
}
export const noteSave = ( note: INote ) => noteSaveAction( note )
export const noteDelete = ( id: ID ): Thunk => dispatch => {
  dispatch( noteClose( id ) )
  dispatch( noteDeleteAction( id ) )
}
